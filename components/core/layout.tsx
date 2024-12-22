'use client';

import { PublicKeyProvider } from '@/contexts/PublicKeyContext';
import { ScreenshotsProvider } from '@/contexts/ScreenshotProvider';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: Props) => {
  return (
    <PublicKeyProvider>
      <ScreenshotsProvider>{children}</ScreenshotsProvider>
    </PublicKeyProvider>
  );
};

export default AppLayout;
