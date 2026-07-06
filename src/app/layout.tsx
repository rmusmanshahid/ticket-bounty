import "./globals.css";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "The Road to Next",
  description: "My Road to Next application ...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={cn("font-sans", geist.variable)}
    >
      <body>
        <ThemeProvider>
          <Header />
          <main
            className="
            min-h-screen flex-1
            overflow-y-auto overflow-x-hidden
            py-24 px-8
            bg-secondary/20
            flex flex-col
          "
          >
            {children}
          </main>
          <Toaster expand />
        </ThemeProvider>
      </body>
    </html>
  );
}
