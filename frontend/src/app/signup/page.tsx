"use client";

import { signup } from "./action";
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
  const [state, action, pending] = useActionState(signup, null);

  const formId = useId();
  const nameId = useId();
  const emailId = useId();
  const passId = useId();
  const confirmId = useId();

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>
          Enter your details below to register your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-6" id={formId}>
          <div className="space-y-3">
            <Label htmlFor={nameId}>Name</Label>
            <Input
              id={nameId}
              name="name"
              type="text"
              placeholder="First name, e.g. John"
              defaultValue={state?.error?.data["name"] as string}
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor={emailId}>Email</Label>
            <Input
              id={emailId}
              name="email"
              type="email"
              placeholder="placeholder@example.com"
              defaultValue={state?.error?.data["email"] as string}
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor={passId}>Password</Label>
            <Input
              id={passId}
              name="password"
              type="password"
              placeholder="********"
              defaultValue={state?.error?.data["password"] as string}
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor={confirmId}>Confirm Password</Label>
            <Input
              id={confirmId}
              name="confirmPassword"
              type="password"
              placeholder="********"
              defaultValue={state?.error?.data["confirmPassword"] as string}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col items-stretch gap-4">
        {state?.error && (
          <p className="text-destructive text-sm">
            <b>Error: </b>
            {state?.error.message}
          </p>
        )}
        <Button form={formId} disabled={pending}>
          {pending ? (
            <LoaderCircleIcon className="animate-spin" />
          ) : (
            "Create Account"
          )}
        </Button>
        <p className="text-center">
          Already have an account?{" "}
          <a href="/login" className="underline">
            Login
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}
