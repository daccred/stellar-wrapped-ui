"use client";

import Link from "next/link";
import { AttestFullIcon } from "@/assets/logo";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const DATA_POINTS = [
  {
    label: "Generating Total Transactions",
    target: 134521,
    format: (value: number) => value.toLocaleString(),
    suffix: "",
  },
  {
    label: "Checking Wallet Activity",
    target: 34,
    format: (value: number) => `${value}%`,
    suffix: "%",
  },
  {
    label: "Analyzing Network Status",
    target: 98,
    format: (value: number) => `${value}%`,
    suffix: "%",
  },
  {
    label: "Calculating Lumens Trading Volume",
    target: 67890,
    format: (value: number) => `$${value.toLocaleString()}`,
    suffix: "",
  },
  {
    label: "Counting Unique Accounts",
    target: 12345,
    format: (value: number) => value.toLocaleString(),
    suffix: "",
  },
  {
    label: "Computing Avg Payment Transaction",
    target: 512,
    format: (value: number) => `$${value}`,
    suffix: "",
  },
  {
    label: "Calculating Saved Transaction Fees",
    target: 18,
    format: (value: number) => `$${value}`,
    suffix: "",
  },
  {
    label: "Analyzing Smart Contract Operations",
    target: 2345,
    format: (value: number) => value.toLocaleString(),
    suffix: "",
  },
  {
    label: "Token Issuance Operations",
    target: 4567,
    format: (value: number) => value.toLocaleString(),
    suffix: "",
  },
  {
    label: "Trustline Creations",
    target: 6789,
    format: (value: number) => value.toLocaleString(),
    suffix: "",
  },
  {
    label: "Liquidity Pool Operations",
    target: 234,
    format: (value: number) => value.toLocaleString(),
    suffix: "",
  },
];

export function LoaderFallback({ isClient }: { isClient?: boolean }) {
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [currentValues, setCurrentValues] = useState<number[]>([43, 30, 12]);
  const duration = 1500; // 1.5 seconds per data point
  const pauseDuration = 500; // 0.5 second pause between sets

  useEffect(() => {
    const startIndex = currentSetIndex * 2;
    const currentDataSet = [
      DATA_POINTS[startIndex % DATA_POINTS.length],
      DATA_POINTS[(startIndex + 1) % DATA_POINTS.length],
    ];

    const startTimes = [Date.now(), Date.now()];

    const updateCounts = () => {
      const currentTime = Date.now();
      const newValues = currentDataSet.map((data, index) => {
        const elapsed = currentTime - startTimes[index];
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        return Math.floor(data.target * easeOutQuart);
      });

      setCurrentValues(newValues);

      // Check if all animations are complete
      const allComplete = newValues.every(
        (value, index) => Math.floor(currentDataSet[index].target * 1) === value
      );

      if (!allComplete) {
        requestAnimationFrame(updateCounts);
      } else {
        // Move to next set of data points after a short pause
        setTimeout(() => {
          setCurrentSetIndex(
            (prev) => (prev + 1) % Math.ceil(DATA_POINTS.length / 2)
          );
          setCurrentValues([0, 0]); // Reset values for the next set
        }, pauseDuration);
      }
    };

    requestAnimationFrame(updateCounts);
  }, [currentSetIndex]);

  // Calculate the current set of data points
  const startIndex = currentSetIndex * 2;
  const currentDataSet = [
    DATA_POINTS[startIndex % DATA_POINTS.length],
    DATA_POINTS[(startIndex + 1) % DATA_POINTS.length],
  ];

  const isSmallScreen =
    typeof window !== "undefined" && window.innerHeight <= 700;

  return (
    <div className="fixed h-screen inset-0 flex flex-col bg-muted">
      <div className="relative h-full w-full flex flex-col max-w-md mx-auto items-start justify-center space-y-8 pt-16">
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
        <div className="relative z-10 flex flex-col items-start justify-start h-full px-4">
          <div className="flex flex-col items-start">
            <span
              className={cn(
                "font-schabo text-black",
                isSmallScreen
                  ? "text-[60px] leading-[65px]"
                  : "text-[80px] sm:text-[120px] leading-[1]"
              )}
            >
              YOUR
            </span>
            <span
              className={cn(
                "font-schabo text-black",
                isSmallScreen
                  ? "text-[60px] leading-[65px]"
                  : "text-[80px] sm:text-[120px] leading-[1]"
              )}
            >
              2024
            </span>
            <span
              className={cn(
                "font-schabo text-black",
                isSmallScreen
                  ? "text-[60px] leading-[65px]"
                  : "text-[80px] sm:text-[120px] leading-[1]"
              )}
            >
              STELLAR
            </span>
            <span
              className={cn(
                "font-schabo text-black",
                isSmallScreen
                  ? "text-[60px] leading-[65px]"
                  : "text-[80px] sm:text-[120px] leading-[1]"
              )}
            >
              WRAPPED
            </span>
          </div>
        </div>
        {!isClient && (
          <div className="w-full space-y-5 absolute bottom-0 z-50 bg-transparent p-6 pb-14 text-muted">
            <div className="text-muted-foreground text-sm sm:text-base mb-4">
              Hang on while we generate your wrapped...
            </div>
            {currentDataSet?.map((data, index) => (
              <div key={data.label}>
                <div className="text-muted-foreground text-sm sm:text-base mb-2">
                  {data.label}
                </div>
                <div className="font-semibold text-lg sm:text-2xl">
                  {data.format(currentValues[index])}
                </div>
              </div>
            ))}
          </div>
        )}
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
