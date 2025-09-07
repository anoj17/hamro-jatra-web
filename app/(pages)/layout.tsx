import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";
import "../globals.css";
import { Footer } from "@/components/landing-components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hamro Jatra - Discover Nepal's Cultural Festivals",
  description:
    "Explore Nepal's vibrant festivals (jatras) with detailed information, stunning images, and cultural insights. Your gateway to Nepal's rich heritage.",
};

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`} suppressHydrationWarning={true}>
        <ToastContainer />
        <NextTopLoader showSpinner={false} color="#950606" />
        {children}
        <Footer />
      </body>
    </html>
  );
}
