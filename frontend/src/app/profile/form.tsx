"use client";
import { useActionState, useId, useState } from "react";
import { type ProfileData, updateProfile } from "./action";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { LoaderCircleIcon } from "lucide-react";

export function   ProfileForm(props: { defaultValue?: Partial<ProfileData> }) {
  const [state, action, pending] = useActionState(updateProfile, null);

  const formId = useId();

  const nameId = useId();
  const emailId = useId();
  const passId = useId();

  const set1Id = useId();
  const set2Id = useId();

  const [changed, setChanged] = useState(false);

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
        <CardDescription>Edit your profile details here.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          action={action}
          className="space-y-6"
          id={formId}
          onChange={() => setChanged(true)}
        >
          <div className="space-y-3">
            <Label htmlFor={nameId}>Name</Label>
            <Input
              id={nameId}
              name="name"
              type="text"
              placeholder="First name, e.g. John"
              defaultValue={props.defaultValue?.name}
            />
            {state?.error?.data["name"] && (
              <p className="text-destructive text-sm">
                {state?.error?.data["name"] as string}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor={emailId}>Email</Label>
            <Input
              id={emailId}
              name="email"
              type="email"
              placeholder="placeholder@example.com"
              defaultValue={props.defaultValue?.email}
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
          <fieldset className="rounded-md border px-3">
            <legend className="ml-2 text-sm font-semibold">Preferences</legend>
            <div className="space-y-6 my-3">
              <div className="space-y-3">
                <Label htmlFor={set1Id}>Setting #1</Label>
                <Input
                  id={set1Id}
                  name="setting1"
                  type="text"
                  placeholder="Setting #1"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor={set2Id}>Setting #2</Label>
                <Input
                  id={set2Id}
                  name="setting2"
                  type="text"
                  placeholder="Setting #2"
                />
              </div>
            </div>
          </fieldset>
        </form>
      </CardContent>
      <CardFooter className="flex-col items-stretch gap-4">
        {state?.error && (
          <p className="text-destructive text-sm">
            <b>Error: </b>
            {state?.error.message}
          </p>
        )}
        <Button form={formId} disabled={pending || !changed}>
          {pending ? (
            <LoaderCircleIcon className="animate-spin" />
          ) : (
            "Save Changes"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
