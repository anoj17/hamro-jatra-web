import { Footer } from "@/components/landing-components/footer";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Navbar } from "@/components/navbar";
import { auth } from "@/auth";
import { SessionProps } from "@/types";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hamro Jatra - Discover Nepal's Cultural Festivals",
  description:
    "Explore Nepal's vibrant festivals (jatras) with detailed information, stunning images, and cultural insights. Your gateway to Nepal's rich heritage.",
};

export default async function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = (await auth()) as SessionProps | null;

  return (
    <html lang="en">
      <body className={`${inter.className}`} suppressHydrationWarning={true}>
        <Navbar session={session} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
