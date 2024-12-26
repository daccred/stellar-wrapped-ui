import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  return (
    <div className="fixed flex flex-col inset-0 bg-muted">
      <div className="relative h-full w-full max-w-md mx-auto">
        {/* Header */}
        <Link
          href="/"
          className="relative flex justify-between items-center w-full p-4 mt-2 z-[99999]"
        >
          <Image
            src="/stellar-logo.svg"
            alt="Stellar Logo"
            width={32}
            height={32}
          />
        </Link>
        <div className="absolute inset-0 w-full h-full">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
