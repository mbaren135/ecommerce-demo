import { ReactNode } from "react";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return <div className="h-[calc(100vh-(var(--spacing)*16))]">{children}</div>;
}
