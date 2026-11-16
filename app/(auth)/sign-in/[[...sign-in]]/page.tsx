import { Suspense } from "react";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <Suspense fallback={<AuthLoading />}>
      <SignIn
        fallbackRedirectUrl="/dashboard"
        signUpFallbackRedirectUrl="/dashboard"
      />
    </Suspense>
  );
}

function AuthLoading() {
  return <div className="min-h-screen bg-neutral-950" />;
}
