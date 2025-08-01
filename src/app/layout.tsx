import "./css/globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import TitleUpdater from "./TitleUpdater";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <TitleUpdater />
        {children}
      </body>
    </html>
  );
}
