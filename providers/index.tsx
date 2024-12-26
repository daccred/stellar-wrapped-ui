"use client";

import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PublicKeyProvider } from "@/contexts/PublicKeyContext";
import { ScreenshotsProvider } from "@/contexts/ScreenshotProvider";

function Providers({ children }: React.PropsWithChildren) {
  const [client] = React.useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })
  );

  return (
    <QueryClientProvider client={client}>
      <PublicKeyProvider>
        <ScreenshotsProvider>{children}</ScreenshotsProvider>
      </PublicKeyProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default Providers;
