import { ReactNode } from "react";

export default function SideNav({
  content,
  setContent,
}: {
  content: string;
  setContent: (newContent: "details" | "cart" | "delete") => void;
}) {
  return (
    <aside className="flex justify-center w-1/4 bg-brand-accent text-brand-primary">
      <div className="container flex flex-col gap-4 p-6 font-sans">
        <ListItem addHr>
          <p className="text-3xl font-semibold">Your Account</p>
        </ListItem>
        <ListItem addHr>
          <p
            className={`p-2 rounded-md text-lg cursor-pointer hover:text-xl hover:underline ${
              content === "details" && "bg-brand-accent-400"
            }`}
            onClick={() => setContent("details")}
          >
            Account Details
          </p>
        </ListItem>
        <ListItem addHr>
          <p
            className={`p-2 rounded-md text-lg cursor-pointer hover:text-xl hover:underline ${
              content === "cart" && "bg-brand-accent-400"
            }`}
            onClick={() => setContent("cart")}
          >
            View Cart Drops
          </p>
        </ListItem>
        <ListItem>
          <p
            className={`p-2 rounded-md text-lg cursor-pointer hover:text-xl hover:underline ${
              content === "delete" && "bg-brand-accent-400"
            }`}
            onClick={() => setContent("delete")}
          >
            Delete Account
          </p>
        </ListItem>
      </div>
    </aside>
  );
}

function ListItem({
  children,
  addHr = false,
}: {
  children: ReactNode;
  addHr?: boolean;
}) {
  return (
    <div className="flex flex-col gap-4">
      {children}
      {addHr && <hr />}
    </div>
  );
}
