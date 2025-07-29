"use client";

import { Button } from "@/components/ui/button";
import { markAllAsRead, markAsRead } from "./action";
import { useActionState } from "react";
import { LoaderCircleIcon } from "lucide-react";

export function MarkAllAsRead() {
  const [state, action, pending] = useActionState(markAllAsRead, null);
  return (
    <form action={action} className="flex items-center gap-1">
      <Button disabled={pending}>
        {pending ? (
          <LoaderCircleIcon className="animate-spin" />
        ) : (
          "Mark all as read"
        )}
      </Button>
    </form>
  );
}

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
