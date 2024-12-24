import React, { createContext, useState, useContext, useCallback } from 'react';

interface ScreenshotsContextType {
  screenshots: string[];
  addScreenshot: (screenshot: string) => void;
  clearScreenshots: () => void;
  getScreenshots: () => string[];
}

const ScreenshotsContext = createContext<ScreenshotsContextType | undefined>(
  undefined
);

export function ScreenshotsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [screenshots, setScreenshots] = useState<string[]>([]);

  const addScreenshot = useCallback((screenshot: string) => {
    setScreenshots((prev) => [...prev, screenshot]);
  }, []);

  const clearScreenshots = useCallback(() => {
    setScreenshots([]);
  }, []);

  const getScreenshots = useCallback(() => {
    return screenshots;
  }, [screenshots]);

  return (
    <ScreenshotsContext.Provider
      value={{
        screenshots,
        addScreenshot,
        clearScreenshots,
        getScreenshots,
      }}
    >
      {children}
    </ScreenshotsContext.Provider>
  );
}

export function useScreenshots() {
  const context = useContext(ScreenshotsContext);
  if (context === undefined) {
    throw new Error('useScreenshots must be used within a ScreenshotsProvider');
  }
  return context;
}
