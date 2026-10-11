import { ReactNode } from "react";
import Navbar from "./_components/NavBar";

export default function MarketingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-neutral-50 selection:bg-[hsl(320,65%,52%,20%)]">
      <Navbar />

      {children}
    </div>
  );
}