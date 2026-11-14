import type { Metadata, Viewport } from "next";
import { Barlow, Graduate } from "next/font/google";
import "./globals.css";

// Graduate: collegiate block lettering for team names and score numerals.
const graduate = Graduate({
  variable: "--font-graduate",
  subsets: ["latin"],
  weight: "400",
});

// Barlow: the interface text (status, buttons, labels).
const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "X's & O's: Tic-Tac-Toe",
  description:
    "Two-player tic-tac-toe played on a gym floor. Take turns, three in a row wins.",
};

export const viewport: Viewport = {
  themeColor: "#dcb07a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${graduate.variable} ${barlow.variable}`}>
      <body>{children}</body>
    </html>
  );
}
