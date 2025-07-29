"use client";

import { login } from "./action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircleIcon } from "lucide-react";
import { useActionState, useId } from "react";

export default function Page() {
  const [state, action, pending] = useActionState(login, null);

  const formId = useId();
  const emailId = useId();
  const passId = useId();

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-6" id={formId}>
          <div className="space-y-3">
            <Label htmlFor={emailId}>Email</Label>
            <Input
              id={emailId}
              name="email"
              type="email"
              placeholder="placeholder@example.com"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor={passId}>Password</Label>
            <Input
              id={passId}
              name="password"
              type="password"
              placeholder="********"
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col items-stretch gap-4">
        {state?.error && (
          <p className="text-destructive text-sm">
            <b>Error: </b>
            {state.error}
          </p>
        )}
        <Button form={formId} disabled={pending}>
          {pending ? <LoaderCircleIcon className="animate-spin" /> : "Login"}
        </Button>
        <p className="text-center">
          Don't have an account?{" "}
          <a href="/signup" className="underline">
            Sign Up
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}
