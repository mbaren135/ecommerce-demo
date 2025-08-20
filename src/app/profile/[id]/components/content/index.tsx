import { MutableUser } from "@/lib/types";
import ProfileDetails from "./details-panel";
import { useEffect, useState } from "react";

export function ProfileContent({
  userId,
  content,
}: {
  userId: string;
  content: "details" | "cart" | "delete";
}) {
  const [user, setUser] = useState<MutableUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      const resp = await fetch(`/api/users/${userId}`);
      if (!resp.ok) {
        setError(`Bad Request: User with id ${userId} not found!`);
        return;
      }

      const data = await resp.json();
      setUser(data.user);
      setLoading(false);
    };

    fetchUser();
  }, [userId]);
  if (error) return <>Error</>;
  if (loading) return <>loading</>;
  if (!user) return <>Waiting for user</>;

  if (content === "details") {
    return <ProfileDetails user={user} setUser={setUser} />;
  }

  if (content === "cart") {
    return <div>Shopping Cart</div>;
  }

  if (content === "delete") {
    return <div>Boo hoo</div>;
  }
}
