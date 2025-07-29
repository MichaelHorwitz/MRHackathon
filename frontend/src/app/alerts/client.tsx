"use client";

import { Button } from "@/components/ui/button";
import { markAsRead } from "./action";
import { useActionState } from "react";
import { LoaderCircleIcon } from "lucide-react";

export function MarkAsRead(props: { id: number }) {
  const [state, action, pending] = useActionState(markAsRead, null);

  return (
    <form action={action} className="flex items-center gap-1">
      {state?.error && (
        <p className="text-sm text-destructive">{state.error}</p>
      )}
      <input type="hidden" name="id" value={props.id} />
      <Button variant="secondary" disabled={pending}>
        {pending ? (
          <LoaderCircleIcon className="animate-spin" />
        ) : (
          "Mark as read"
        )}
      </Button>
    </form>
  );
}
