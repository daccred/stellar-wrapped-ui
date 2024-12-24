"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePublicKey } from "@/contexts/PublicKeyContext";

const WalletInput = () => {
  const [publicKey, setPublicKey] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { setPublicKey: setToken } = usePublicKey();
  // Clear error after 3 seconds
  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  const validateStellarPublicKey = (key: string) => {
    // Basic Stellar public key validation - starts with G and is 56 characters long
    const stellarKeyRegex = /^G[A-Za-z0-9]{55}$/;
    return stellarKeyRegex.test(key);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (!publicKey) {
        throw new Error("Please enter a Stellar wallet address");
      }

      if (!validateStellarPublicKey(publicKey)) {
        throw new Error("Invalid Stellar wallet address format");
      }
      setToken(publicKey)
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed flex flex-col inset-0 bg-background">
      <div className="relative h-full w-full max-w-md mx-auto">
        <Image
          src="/backgrounds/home-bg.png"
          alt="Background pattern"
          width={240}
          height={80}
          className="absolute w-full h-full inset-0 top-0"
          priority
          unoptimized
        />

        <div className="relative h-full w-full z-40 px-6 flex flex-col items-center justify-center -mt-20">
          <div className="space-y-4 max-w-[500px]">
            <h1
              className="text-[50px] leading-[1.1] sm:text-[61px] font-schabo sm:leading-[60px] font-bold tracking-wide"
              style={{
                backgroundImage: `url('/backgrounds/text-bg.svg')`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% auto",
              }}
            >
              YOUR STELLAR
              <br />
              JOURNEY, <span className="relative">WRAPPED!</span>
            </h1>
            <p className="text-[#6C6C6C] text-sm sm:text-base leading-relaxed">
              Dive into your Stellar wallet activity to uncover insights, track
              transactions, explore DeFi, and see your impact on the ecosystem.
            </p>
            <form
              onSubmit={handleSubmit}
              className="space-y-6 flex flex-col items-center justify-center w-full pt-4"
            >
              <div className="space-y-2 w-full">
                <label
                  htmlFor="wallet"
                  className="block text-sm text-[#1E1E1E]"
                >
                  Enter your Stellar Wallet Address
                </label>
                <input
                  type="text"
                  id="wallet"
                  value={publicKey}
                  onChange={(e) => setPublicKey(e.target.value)}
                  placeholder="Eg. GABC...7UXM..."
                  className={cn(
                    "placeholder:text-[#6C6C6C] w-full px-5 py-3.5 bg-[#CBC8BB] backdrop-blur-sm rounded-full border outline-none ",
                    { "border-red-500": error },
                    { "border-white/10": !error },
                  )}
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-black mt-10 text-white rounded-full pl-4 pr-2 py-2 text-sm sm:text-base flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    Generating Wrap
                    <span className="text-base p-2 rounded-full bg-[#FDDA24] text-black">
                      <Loader2 className="w-5 h-5 animate-spin" />
                    </span>
                  </>
                ) : (
                  <>
                    Generate Wrap
                    <span className="text-base p-2 rounded-full bg-[#FDDA24] text-black">
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletInput;
