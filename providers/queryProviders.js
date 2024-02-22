"use client";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function QueryProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default QueryProvider;
