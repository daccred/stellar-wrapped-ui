import AppLayout from '@/components/core/layout';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  return <AppLayout>{children}</AppLayout>;
};

export default Layout;
