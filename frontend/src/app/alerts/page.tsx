import { client, toResult } from "@/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MarkAllAsRead, MarkAsRead } from "./client";

export default async function Page() {
  const { data, error } = await client.GET("/notifs").then(toResult);
  if (error) {
    throw new Error(`${error.statusCode} ${error.message}`);
  }

  return (
    <div className="space-y-6 m-6">
      <header className="flex items-center gap-2">
        <h1 className="grow text-xl font-semibold">Notifications Dashboard</h1>
        <MarkAllAsRead />
      </header>
      <ul>
        {data.map((item) => (
          <Card key={item.id} className="p-2 pl-4 items-center flex-row">
            <p className="grow font-semibold">{item.title}</p>
            <p className="text-muted-foreground">{item.created_at}</p>
            {item.status === "Unread" && <MarkAsRead id={item.id} />}
          </Card>
        ))}
      </ul>
    </div>
  );
}
