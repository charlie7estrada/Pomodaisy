import type { Metadata } from "next";
import localFont from "next/font/local";
import Background from "@/components/Background";
import Header from "@/components/Header";
import "./globals.css";

// Optional site fonts. preload: false means the browser downloads a font only
// when the page uses it, so visitors on the default font download none of them.
const earlyGameBoy = localFont({
  src: "./fonts/early-gameboy.ttf",
  weight: "400",
  preload: false,
  variable: "--font-early-gameboy",
});

const matchaStyle = localFont({
  src: "./fonts/matcha-style.ttf",
  weight: "400",
  preload: false,
  variable: "--font-matcha-style",
});

const komikaTitle = localFont({
  src: "./fonts/komika-title.ttf",
  weight: "400",
  preload: false,
  variable: "--font-komika-title",
});

export const metadata: Metadata = {
  title: "Pomodaisy",
  description: "A Pomodoro timer with Daisy the shih-tzu.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en"
      className={`${earlyGameBoy.variable} ${matchaStyle.variable} ${komikaTitle.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-ink">
        <Background />
        <Header />
        {children}
      </body>
    </html>
  );
}
