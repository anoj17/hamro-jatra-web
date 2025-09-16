"use client";
import { useSidebar } from "@/hooks/useSidebar";
import { SessionProps } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface MainComponentProps {
  children: React.ReactNode;
  session: SessionProps;
}

export default function MainComponent({
  children,
  session,
}: MainComponentProps) {
  const { isMinimized } = useSidebar();
  const router = useRouter();

  useEffect(() => {
    if (!session?.user) {
      router.push("/");
      return;
    }

    if (session.user.email !== "anojbudathoki17@gmail.com") {
      router.push("/");
    }
  }, [session, router]);
  return (
    <main
      className={`flex-1 overflow-auto transition-all ${
        isMinimized ? "lg:ml-16" : "lg:ml-64"
      }`}
    >
      {children}
    </main>
  );
}
