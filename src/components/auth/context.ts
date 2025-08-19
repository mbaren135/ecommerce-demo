import { createContext } from "react";

type authContext = {
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<unknown>;
  logout: () => void;
  fetchWithAuth: (url: string, options?: RequestInit) => Promise<unknown>;
  status: "authenticated" | "loading" | "unauthenticated";
};

const AuthContext = createContext<authContext>({
  token: null,
  loading: false,
  error: null,
  login: async () => {
    throw new Error("AuthProvider missing");
  },
  logout: () => {
    throw new Error("AuthProvider missing");
  },
  fetchWithAuth: async () => {
    throw new Error("AuthProvider missing");
  },
  status: "unauthenticated",
});

export default AuthContext;
