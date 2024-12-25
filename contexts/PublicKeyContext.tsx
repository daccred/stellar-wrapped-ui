import { createContext, useState, useContext, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FormattedActivitySummary } from "@/types";
import { SummaryService } from "../services";

export const SUMMARY_QUERY_KEY = "userSummary";

interface PublicKeyContextType {
  publicKey: string | null;
  setPublicKey: (key: string | null) => void;
  userData: FormattedActivitySummary | null;
  isLoading: boolean;
  error: Error | null;
  validateAndFetchData: (key: string) => Promise<void>;
}

const PublicKeyContext = createContext<PublicKeyContextType | undefined>(
  undefined
);

export function PublicKeyProvider({ children }: { children: React.ReactNode }) {
  const [publicKey, setPublicKeyState] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const {
    data: userData,
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: [SUMMARY_QUERY_KEY, publicKey],
    queryFn: async () => {
      if (!publicKey) {
        throw new Error("Public key is not available");
      }
      return await SummaryService.getUserSummary(publicKey);
    },
    enabled: Boolean(publicKey),
    staleTime: 5 * 60 * 1000,
  });

  const setPublicKey = (key: string | null) => {
    setPublicKeyState(key);
    if (key) {
      localStorage.setItem("publicKey", key);
    } else {
      localStorage.removeItem("publicKey");
      queryClient.removeQueries({ queryKey: [SUMMARY_QUERY_KEY] });
    }
  };

  const validateAndFetchData = async (key: string) => {
    try {
      const isValid = await SummaryService.validateWallet(key);
  
      if (!isValid) {
        throw new Error("Unable to fetch wallet data. Please try again.");
      }
  
      await queryClient.prefetchQuery<FormattedActivitySummary, Error>({
        queryKey: [SUMMARY_QUERY_KEY, key],
        queryFn: async () => await SummaryService.getUserSummary(key),
      });
  
      setPublicKey(key);
    } catch (error) {
      const errorMessage = 
        error instanceof Error && error.message
          ? error.message
          : "An unexpected error occurred. Please try again later.";
      
      throw new Error(errorMessage);
    }
  };
  

  useEffect(() => {
    const storedPublicKey = localStorage.getItem("publicKey");
    if (storedPublicKey) {
      setPublicKey(storedPublicKey);
    }
  }, []);

  // Ensure that the error is always of type Error | null
  const contextError: Error | null =
    queryError instanceof Error ? queryError : null;

  return (
    <PublicKeyContext.Provider
      value={{
        publicKey,
        setPublicKey,
        userData: userData ?? null,
        isLoading,
        error: contextError,
        validateAndFetchData,
      }}
    >
      {children}
    </PublicKeyContext.Provider>
  );
}

export function usePublicKey() {
  const context = useContext(PublicKeyContext);
  if (context === undefined) {
    throw new Error("usePublicKey must be used within a PublicKeyProvider");
  }
  return context;
}
