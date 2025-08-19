import { User } from "@/lib/types/user";
import { Suspense, useEffect, useState } from "react";
import UserCard from "./user-card";
import UserSkeleton from "./user-skeleton";

function UserList() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const resp = await fetch("api/users/list");
      if (!resp.ok) {
        setError("Bad Request: Could not retrieve users");
        return;
      }

      const data = await resp.json();
      setUsers(data.users);
      setLoading(false)
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <UserSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error)
    return <h1 className="font-bold text-lg text-brand-accent">{error}</h1>;

  return (
    <>
      {users && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
          {users.map((u, i) => {
            return <UserCard key={i} user={u} />;
          })}
        </div>
      )}
    </>
  );
}

export default function UserGrid() {
  return (
    <div className="p-4 h-screen flex items-center w-full">
      <div className="h-3/4 w-full overflow-auto">
        <Suspense
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <UserSkeleton key={i} />
              ))}
            </div>
          }
        >
          <UserList />
        </Suspense>
      </div>
    </div>
  );
}
