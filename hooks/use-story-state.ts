import { useState, useEffect, useCallback, useRef } from 'react';
import { PanInfo } from 'framer-motion';
import { usePublicKey } from '@/contexts/PublicKeyContext';
import { useToSvg } from '@hugocxl/react-to-image';
import { useScreenshots } from '@/contexts/ScreenshotProvider';

interface Story {
  id: string;
  component: React.ReactNode;
  requiresPublicKey: boolean;
  excludeScreenshot: boolean;
}
interface ScreenshotOptions {
  delay?: number; // Delay in seconds before taking screenshot
}

export function useStoryState(
  stories: Story[],
  screenshotOptions: ScreenshotOptions = {}
) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<number>(0);
  const { publicKey, setPublicKey } = usePublicKey();
  const lastActivityTimeRef = useRef<number>(Date.now());
  // const screenshotTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { addScreenshot } = useScreenshots();

  // Screenshot configuration
  const { delay = 5 } = screenshotOptions;

  // useToSvg hook for screenshots
  const [state, convertToSvg] = useToSvg<HTMLDivElement>({
    selector: `#${stories[currentIndex]?.id}`,
    onSuccess: (data: string) => {
      // Only add screenshot if story is not excluded
      if (!stories[currentIndex]?.excludeScreenshot) {
        addScreenshot(data);
        console.log('Screenshot taken:', data);
      }
    },
  });

  // Reset progress and start a new interval
  const resetProgress = useCallback(() => {
    setProgress(0);
    progressRef.current = 0;
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
    progressInterval.current = setInterval(() => {
      if (!isPaused) {
        progressRef.current += 1;
        setProgress(() => {
          if (progressRef.current >= 200) {
            clearInterval(progressInterval.current as NodeJS.Timeout);
            return 250;
          }
          return progressRef.current;
        });
      }
    }, 250);
  }, [isPaused]);

  // Update last activity time
  const updateLastActivityTime = useCallback(() => {
    lastActivityTimeRef.current = Date.now();
  }, []);

  // Pause toggle with precise behavior
  const togglePause = useCallback(() => {
    setIsPaused((prev) => {
      // If becoming paused, stop the progress
      if (!prev) {
        if (progressInterval.current) {
          clearInterval(progressInterval.current);
        }
      } else {
        // If resuming, restart the progress interval
        resetProgress();
      }
      return !prev;
    });
    updateLastActivityTime();
  }, [resetProgress, updateLastActivityTime]);

  // Find the first index that requires a public key
  const findFirstPublicKeyRequiredIndex = useCallback(() => {
    return stories.findIndex((story) => story.requiresPublicKey);
  }, [stories, publicKey]);

  // Navigate between stories
  const paginate = useCallback(
    (newDirection: number) => {
      // Allow navigation even when paused
      let nextIndex = currentIndex + newDirection;

      if (publicKey) {
        const firstPublicKeyRequiredIndex = findFirstPublicKeyRequiredIndex();
        if (nextIndex < firstPublicKeyRequiredIndex) {
          nextIndex = firstPublicKeyRequiredIndex;
        }
      } else if (stories[nextIndex]?.requiresPublicKey) {
        return;
      }

      if (nextIndex < 0 || nextIndex >= stories.length) return;

      setDirection(newDirection);
      setCurrentIndex(nextIndex);
      setIsPaused(false);
      resetProgress();
      updateLastActivityTime();
    },
    [
      currentIndex,
      stories,
      publicKey,
      resetProgress,
      findFirstPublicKeyRequiredIndex,
      updateLastActivityTime,
    ]
  );

  // Convenience methods for navigation
  const goToNextStory = useCallback(() => paginate(1), [paginate]);
  const goToPreviousStory = useCallback(() => paginate(-1), [paginate]);

  // Reset to start or first public key required index
  const resetToStart = useCallback(
    (isSignOut: boolean) => {
      const startIndex = isSignOut ? 0 : findFirstPublicKeyRequiredIndex();
      setCurrentIndex(startIndex);
      setDirection(-1);
      resetProgress();
      updateLastActivityTime();
    },
    [
      publicKey,
      findFirstPublicKeyRequiredIndex,
      resetProgress,
      updateLastActivityTime,
    ]
  );

  // Handle drag/swipe gestures
  const handleDragEnd = useCallback(
    (_: unknown, { offset, velocity }: PanInfo) => {
      // Allow dragging even when paused
      const swipe = Math.abs(offset.x) * velocity.x;
      const swipeConfidenceThreshold = 10000;

      if (swipe < -swipeConfidenceThreshold) {
        goToNextStory();
      } else if (swipe > swipeConfidenceThreshold) {
        goToPreviousStory();
      }
    },
    [goToNextStory, goToPreviousStory]
  );

  // Add event listeners for keyboard and touch interactions
  useEffect(() => {
    // Handle keyboard navigation and pause
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default space bar scrolling
      if (e.key === ' ') {
        e.preventDefault();
      }

      switch (e.key) {
        case 'ArrowRight':
          goToNextStory();
          break;
        case 'ArrowLeft':
          goToPreviousStory();
          break;
        case ' ':
          togglePause();
          break;
      }
      updateLastActivityTime();
    };

    // Handle touch and mouse interactions
    const handleTouchStart = () => {
      if (!isPaused) togglePause();
      updateLastActivityTime();
    };
    const handleTouchEnd = () => {
      if (isPaused) togglePause();
      updateLastActivityTime();
    };

    // Add event listeners
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    // Add session timeout check
    const checkSessionTimeout = () => {
      const currentTime = Date.now();
      const SESSION_TIMEOUT = 4 * 60 * 60 * 1000; // 4 hours in milliseconds

      if (currentTime - lastActivityTimeRef.current > SESSION_TIMEOUT) {
        setPublicKey(null);
      }
    };

    // Check session timeout every 15 minutes
    const sessionTimeoutInterval = setInterval(
      checkSessionTimeout,
      15 * 60 * 1000
    );

    // Cleanup event listeners and interval
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      clearInterval(sessionTimeoutInterval);
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [
    goToNextStory,
    goToPreviousStory,
    togglePause,
    isPaused,
    updateLastActivityTime,
    setPublicKey,
  ]);

  // Automatic story progression
  useEffect(() => {
    resetProgress();
    const timer = setTimeout(() => {
      if (!isPaused) {
        goToNextStory();
      }
    }, 10000);

    return () => {
      clearTimeout(timer);
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [currentIndex, isPaused, goToNextStory, resetProgress]);

  // Adjust index based on public key
  useEffect(() => {
    if (publicKey) {
      const firstPublicKeyRequiredIndex = findFirstPublicKeyRequiredIndex();
      if (currentIndex < firstPublicKeyRequiredIndex) {
        setCurrentIndex(firstPublicKeyRequiredIndex);
        setDirection(1);
        resetProgress();
      }
    }
  }, [publicKey, currentIndex, findFirstPublicKeyRequiredIndex, resetProgress]);

  return {
    currentIndex,
    direction,
    progress,
    isPaused,
    setIsPaused,
    goToNextStory,
    goToPreviousStory,
    resetToStart,
    handleDragEnd,
    resetProgress,
    togglePause,
  };
}
