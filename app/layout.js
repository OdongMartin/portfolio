import { Oxanium } from "next/font/google";
import "./globals.css";



const font = Oxanium({ subsets: ["latin"] });


export const metadata = {
  title: "Portfolio",
  description: "Web Developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
