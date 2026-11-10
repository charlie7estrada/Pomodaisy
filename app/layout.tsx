import type { Metadata } from "next";
import Background from "@/components/Background";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pomodaisy",
  description: "A Pomodoro timer with Daisy the shih-tzu.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans text-ink">
        <Background />
        <Header />
        {children}
      </body>
    </html>
  );
}
