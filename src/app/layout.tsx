import type { Metadata } from "next";
import { Inter, Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const kufi = Noto_Kufi_Arabic({
  variable: "--font-kufi",
  subsets: ["arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "مآل | Ma'al",
  description:
    "A minimalist neuro-architectural journey in Madinah — compression to relief.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${inter.variable} ${kufi.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-ar">{children}</body>
    </html>
  );
}
