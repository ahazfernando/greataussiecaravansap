"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Newsletter } from "@/components/home/Newsletter";
import { VideoSection } from "@/components/home/VideoSection";
import LatestBlogs from "@/components/blog/LatestBlogs";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const showBlogs = pathname !== "/about";
  const showVideo = pathname === "/" || pathname === "/about";

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Navbar />
      <main className="flex-1 pt-[57px] sm:pt-[61px] md:pt-[73px] lg:pt-[80px] bg-gray-900">
        {children}
      </main>
      {showVideo && <VideoSection />}
      {showBlogs && <LatestBlogs />}
      <Newsletter />
      <Footer />
    </div>
  );
}
