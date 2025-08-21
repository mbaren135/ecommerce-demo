"use client";
import { useState, use } from "react";
import SideNav from "./components/side-nav";
import ProfileContent from "./components/content";


export default function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [content, setContent] = useState<"details" | "cart" | "delete">(
    "details"
  );

  return (
    <div className="flex w-full h-full">
      <SideNav content={content} setContent={setContent} />
      <div className="w-3/4 p-6">
        <ProfileContent userId={id} content={content} />
      </div>
    </div>
  );
}
