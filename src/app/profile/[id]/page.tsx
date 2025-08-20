"use client";
import { User } from "@/lib/types/user";
import { useState, useEffect, use } from "react";
import SideNav from "./components/side-nav";
import { ProfileContent } from "./components/content";

export default function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [content, setContent] = useState<"details" | "cart" | "delete">(
    "details"
  );

  useEffect(() => {
    const fetchUser = async () => {
      const resp = await fetch(`/api/users/${id}`);
      if (!resp.ok) {
        setError(`Bad Request: User with id ${id} not found!`);
        return;
      }

      const data = await resp.json();
      setUser(data.user);
      setLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <div className="flex w-full h-full">
      <SideNav content={content} setContent={setContent} />
      <div className="w-3/4 p-6">
        {user && <ProfileContent user={user} content={content} />}
      </div>
    </div>
  );
}
