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
  const [userId, setUserId] = useState<number | null>(null);

  // Save token to state and localStorage
  const saveToken = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("fakestore_token", newToken);
  };

  const parseJWT = (token: string) => {
    const base64URL = token.split(".")[1];
    const base64 = base64URL.replace(/-/g, "+").replace(/_/g, "_");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
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

      /**
       * Decode the JWT. fakestoreapi doesn't publish a secret for verification,
       * so we can just decode it.
       */

      const decoded = parseJWT(data.token)
      setUserId(decoded.sub);
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

  return {
    token,
    loading,
    error,
    login,
    logout,
    fetchWithAuth,
    status,
    userId,
  };
}
