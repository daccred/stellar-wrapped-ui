"use client";

import Link from "next/link";
import { AttestFullIcon } from "@/assets/logo";
import Image from "next/image";

export function LoaderFallback() {
  return (
    <div className="fixed h-screen inset-0 flex flex-col bg-muted">
      <div className="relative h-full w-full flex flex-col max-w-md mx-auto items-start justify-center space-y-8">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url('/backgrounds/yellow-grunge-bg.png')`,
          }}
        />
        <Image
          src="/stellar-logo.svg"
          alt="Stellar Logo"
          width={32}
          height={32}
          unoptimized
          className="absolute top-0 left-4"
        />
        <div className="relative z-10 flex flex-col items-start justify-center h-full px-4">
          <div className="flex flex-col items-start">
            <span className="text-[120px] leading-[1] font-schabo text-black">
              YOUR
            </span>
            <span className="text-[120px] leading-[1] font-schabo text-black">
              2024
            </span>
            <span className="text-[120px] leading-[1] font-schabo text-black">
              STELLAR
            </span>
            <span className="text-[120px] leading-[1] font-schabo text-black">
              WRAPPED
            </span>
          </div>
        </div>
      </div>{" "}
      {/* Footer */}
      <div className="relative w-full p-4 flex items-center justify-center text-center gap-2 z-50 bg-white max-w-md mx-auto">
        <p className="text-xs text-black">Powered by </p>
        <Link href="https://x.com/attestprotocol" target="_blank">
          <AttestFullIcon className="h-3 text-black w-fit" />
        </Link>
      </div>
    </div>
  );
}
