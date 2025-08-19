import { useState, useCallback } from "react";

type statusType = "authenticated" | "loading" | "unauthenticated";

export function useAuth() {
  const [token, setToken] = useState<string | null>(() =>
    typeof window !== "undefined"
      ? localStorage.getItem("fakestore_token")
      : null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Save token to state and localStorage
  const saveToken = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("fakestore_token", newToken);
  };

  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error(`Login failed: Invalid credentials`);

      const data = await res.json();
      saveToken(data.token);
      setLoading(false);
      return data.token;
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Login error");
      setLoading(false);
      return null;
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("fakestore_token");
  };

  // Helper to call protected endpoints
  const fetchWithAuth = useCallback(
    async (url: string, options: RequestInit = {}) => {
      if (!token) throw new Error("Not authenticated");
      const res = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error(`Request failed: ${res.statusText}`);
      return res.json();
    },
    [token]
  );

  const status: statusType =
    token && !error ? "authenticated" : loading ? "loading" : "unauthenticated";

  return { token, loading, error, login, logout, fetchWithAuth, status };
}
