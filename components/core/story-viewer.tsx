"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Repeat, Share2 } from "lucide-react";
import Image from "next/image";
import { Icons } from "@/assets/icons";
import { useStoryState } from "@/hooks/use-story-state";
import { usePublicKey } from "@/contexts/PublicKeyContext";
import { AttestFullIcon } from "@/assets/logo";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "../ui/button";
import { ShareModal } from "./share-modal";
import { getStoryStyles } from "@/utlis";

interface Story {
  id: string;
  component: React.ReactNode;
  requiresPublicKey: boolean;
  isShare: boolean;
  excludeScreenshot: boolean;
}

interface StoryViewerProps {
  stories: Story[];
}

export function StoryViewer({ stories }: StoryViewerProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { publicKey, setPublicKey } = usePublicKey();
  const [shareModalOpen, setShareModalOpen] = useState<boolean>(false);
  const [showShareButton, setShowShareButton] = useState<boolean>(false);
  const {
    currentIndex,
    direction,
    goToNextStory,
    goToPreviousStory,
    resetToStart,
    handleDragEnd,
  } = useStoryState(stories);
  const storyStyles = getStoryStyles(currentIndex);

  useEffect(() => {
    if (stories[currentIndex]?.id === "year-stats") {
      setShowShareButton(false);
      const timer = setTimeout(() => {
        setShowShareButton(true);
      }, 5000); // 5 seconds delay for year-stats
      return () => clearTimeout(timer);
    } else {
      setShowShareButton(true); // Immediately show for other stories
    }
  }, [currentIndex, stories]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const renderNavigationButtons = () => {
    const nextStory = stories[currentIndex + 1];
    const isNextStoryLocked = nextStory?.requiresPublicKey && !publicKey;

    if (isDesktop) {
      return (
        <>
          {currentIndex !== 0 && stories[currentIndex].id !== "intro" && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute -left-14 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 z-20"
              onClick={goToPreviousStory}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="w-6 h-6 text-white/80" />
            </Button>
          )}
          {currentIndex === stories.length - 1 || isNextStoryLocked ? null : (
            <Button
              variant="ghost"
              size="icon"
              className="absolute -right-14 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 z-20"
              onClick={goToNextStory}
              disabled={
                currentIndex === stories.length - 1 || isNextStoryLocked
              }
            >
              <ChevronRight
                className={`w-6 h-6 ${
                  isNextStoryLocked ? "text-white/30" : "text-white/80"
                }`}
              />
            </Button>
          )}
        </>
      );
    }

    return (
      <>
        {stories[currentIndex].id !== "welcome" && (
          <button
            className="absolute left-0 top-0 w-16 opacity-0 z-20 h-full"
            onClick={goToPreviousStory}
          />
        )}
        <button
          className="absolute right-0 top-0 w-16 opacity-0 z-20 h-[80vh]"
          onClick={goToNextStory}
          disabled={isNextStoryLocked}
        />
      </>
    );
  };
  return (
    <div className="fixed flex flex-col inset-0 bg-muted">
      <div className="relative h-full w-full max-w-md mx-auto">
        {/* Story content with ID for screenshot */}
        <div id={stories[currentIndex].id} className=" h-full w-full">
          {/* Header */}
          <div className="relative flex justify-between items-center w-full p-4 mt-2 z-[99999]">
            <Image
              src="/stellar-logo.svg"
              alt="Stellar Logo"
              width={32}
              height={32}
            />
            <div className="flex gap-2 nav-buttons z-10">
              {currentIndex > 0 && (
                <div
                  className={`px-3 py-1 text-center text-sm flex items-center justify-center ${storyStyles.counterBg} rounded-full`}
                >
                  <span className={storyStyles.counterTextPrimary}>
                    {currentIndex} /
                  </span>{" "}
                  <span className={`ml-1 ${storyStyles.counterTextSecondary}`}>
                    {stories.length || 0}
                  </span>
                </div>
              )}

              {stories[currentIndex]?.isShare && showShareButton && (
                <button
                  onClick={() => setShareModalOpen(true)}
                  className="rounded-full bg-white/10 p-2 w-8 flex items-center justify-center h-8"
                >
                  <Share2 className="text-white w-4 h-4" />
                </button>
              )}
              {publicKey && (
                <button
                  className="rounded-full  bg-white/10 p-2 w-8 flex items-center justify-center h-8"
                  onClick={() => {
                    setPublicKey(null);
                    resetToStart(true);
                  }}
                >
                  <Icons.Close />
                </button>
              )}
            </div>
          </div>

          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 1 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={handleDragEnd}
              className="absolute inset-0 w-full h-full"
            >
              <div className="relative h-full w-full z-40 overflow-hidden">
                {stories[currentIndex].component}

                {currentIndex === stories.length - 1 && (
                  <button
                    className="w-fit hidden rounded-full py-3 px-6 mt-6 text-white font-medium items-center justify-center gap-2 z-50 mx-auto absolute bottom-16 inset-x-0 text-sm sm:text-base"
                    style={{
                      background:
                        "linear-gradient(90deg, #B56BE6 10%, #753ACD 50%, #2F155D 100%)",
                    }}
                    onClick={() => resetToStart(false)}
                  >
                    <Repeat className="w-4 h-4 mr-2" />
                    Replay from the beginning
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation - Desktop: visible buttons, Mobile: edge click areas */}
        {renderNavigationButtons()}
      </div>
      {/* Footer */}
      <div className="relative w-full p-4 flex items-center justify-center text-center gap-2 z-50 bg-white max-w-md mx-auto">
        <p className="text-xs text-black">Powered by </p>
        <Link href="https://x.com/attestprotocol" target="_blank">
          <AttestFullIcon className="h-3 text-black w-fit" />
        </Link>
      </div>
      {/* Share Modal */}
      <ShareModal
        open={shareModalOpen}
        onOpenChange={setShareModalOpen}
        storyId={stories[currentIndex]?.id}
      />
    </div>
  );
}
