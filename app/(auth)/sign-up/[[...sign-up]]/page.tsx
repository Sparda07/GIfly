import { Suspense } from "react";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <Suspense fallback={<AuthLoading />}>
      <SignUp
        fallbackRedirectUrl="/dashboard"
        signInFallbackRedirectUrl="/dashboard"
      />
    </Suspense>
  );
}

function AuthLoading() {
  return <div className="min-h-screen bg-neutral-950" />;
}
