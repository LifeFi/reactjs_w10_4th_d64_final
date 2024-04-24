"use client";
import { SWRConfig } from "swr";
export const SWRProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      {children}
    </SWRConfig>
  );
};
