import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div>
      <Card className="max-w-md mx-auto mt-6">
        <CardHeader>
          <CardTitle>Welcome!</CardTitle>
        </CardHeader>
        <CardContent className="gap-2 flex flex-col">
          <Button asChild>
            <a href="/signup">Sign Up</a>
          </Button>
          <Button asChild>
            <a href="/login">Login</a>
          </Button>
          <Button asChild>
            <a href="/alerts">Alerts</a>
          </Button>
          <Button asChild>
            <a href="/profile">Profile</a>
          </Button>
          <Button asChild>
            <a href="/travelRisk">Travel Risk</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
