"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession, signIn, signOut } from "next-auth/react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const { data: session } = useSession();

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">
          {session ? "Welcome!" : "Login to your account"}
        </h1>
        <p className="text-balance text-sm text-muted-foreground">
          {session
            ? `Logged in as ${session.user?.email}`
            : "Enter your email below to login to your account"}
        </p>
      </div>

      {!session && (
        <>
          <div className="grid gap-6">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => signIn("google", { callbackUrl: "/" })}
            >
              Login with Google
            </Button>
          </div>
        </>
      )}

      {session && (
        <Button
          type="button"
          variant="destructive"
          className="w-full"
          onClick={() => signOut({ callbackUrl: "/auth/login" })}
        >
          Sign Out
        </Button>
      )}
    </form>
  );
}
