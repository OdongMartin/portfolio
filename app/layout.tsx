import type { Metadata } from "next";
import { Oxanium } from "next/font/google";
import "./globals.css";



const font = Oxanium({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Portfolio",
  description: "Web Developer",
};

export default function RootLayout({ children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
