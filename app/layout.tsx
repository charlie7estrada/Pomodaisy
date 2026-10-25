import type { Metadata } from "next";
import { Pixelify_Sans } from "next/font/google";
import Background from "@/components/Background";
import Header from "@/components/Header";
import "./globals.css";

const pixelify = Pixelify_Sans({
  subsets: ["latin"],
  variable: "--font-pixelify",
});

export const metadata: Metadata = {
  title: "Pomodaisy",
  description: "A Pomodoro timer with Daisy the shih-tzu.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${pixelify.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans text-ink">
        <Background />
        <Header />
        {children}
      </body>
    </html>
  );
}
