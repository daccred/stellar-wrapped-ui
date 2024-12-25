'use client';

import React from "react";

type Props = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default AppLayout;
