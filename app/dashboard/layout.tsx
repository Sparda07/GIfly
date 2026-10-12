import { ReactNode } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import DashboardNavbar from "./_components/NavBar";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      className={`${jakarta.variable} min-h-screen bg-[#f8f7fc] font-[var(--font-jakarta)] text-neutral-950`}
    >
      <DashboardNavbar />

      <div className="mx-auto max-w-[1400px] px-5 py-8 sm:px-8">
        {children}
      </div>
    </div>
  );
}