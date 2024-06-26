import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SWRProvider } from "./swr-provider";
import Nav from "@/components/nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | OX in X Clone",
    default: "OX in X Clone",
  },
  description: "Truth or Fake",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // layout 은 SC 여야 하기에, SWRProvider를 CC 로 만들어서 가져옴 => layout CC 로 된다고 함.
    <SWRProvider>
      <html lang="en">
        <body
          className={`${inter.className} min-h-screen max-w-screen-sm mx-auto border-x border-gray-200 box-content overflow-y-scroll`}
        >
          {children}
          {/* <Nav /> */}
        </body>
      </html>
    </SWRProvider>
  );
}
