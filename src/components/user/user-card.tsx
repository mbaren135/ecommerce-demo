import { User } from "@/lib/types/user";
import { Card, CardContent } from "@/components/ui/card";
import formatName from "@/lib/utils/format-user-name";

export default function UserCard({ user }: { user: User }) {
  return (
    <Card className="group border-brand-light-400 rounded-lg py-3 bg-brand-accent-100">
      <CardContent className="w-full max-h-fit px-3 text-brand-primary font-sans">
        <p className="text-lg font-bold">
          {formatName(user.name)}
        </p>
        <p><span className="font-semibold">Username:</span> {user.username}</p>
        <p><span className="font-semibold">Password:</span> {user.password}</p>
      </CardContent>
    </Card>
  );
}
