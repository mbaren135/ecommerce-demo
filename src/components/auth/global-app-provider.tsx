"use client";
import { ReactNode, useContext } from "react";
import LoginForm from "./login";
import { useAuth } from "@/lib/hooks/useAuth";
import AuthContext from "./context";

export default function AppProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();
  return (
    <AuthContext value={auth}>
      <AuthGate>{children}</AuthGate>
    </AuthContext>
  );
}

function AuthGate({ children }: { children: ReactNode }) {
  const { status } = useContext(AuthContext);

  if (status === "authenticated") {
    return <>{children}</>;
  } else return <LoginForm />;
}
