import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
export const metadata: Metadata = {
  title: "flexibble",
  description: "Dribbble is a popular online community and platform specifically designed for designers, artists, illustrators, and creative professionals to showcase their work, share their portfolios.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <SessionProviderWrapper>
        <Navbar/>
        {children}
        <Footer/>
        </SessionProviderWrapper>
      </body>

    </html>
  );
}
