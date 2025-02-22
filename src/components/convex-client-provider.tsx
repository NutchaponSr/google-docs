"use client";

import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkProvider, useAuth, SignIn } from "@clerk/clerk-react";
import { ConvexReactClient, Authenticated, Unauthenticated, AuthLoading } from "convex/react";

import { FullscreenLoader } from "@/components/fullscreen-loader";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const ConvexClientProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <Authenticated>
          {children}
        </Authenticated>
        <Unauthenticated>
          <div className="flex flex-col items-center justify-center min-h-screen">
            <SignIn routing="hash" />
          </div>
        </Unauthenticated>
        <AuthLoading>
          <FullscreenLoader label="Auth loading..." />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}