import { useContext, useState } from "react";
import AuthContext from "./context";
import UserGrid from "@/components/user/user-grid";

export default function LoginForm() {
  const { login, loading, error } = useContext(AuthContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    await login(username, password);
  };

  const disabled = username === "" || password === ""

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="grid grid-cols-[2fr_1fr]">
        <div className="font-sans flex flex-col gap-4 items-center text-brand-primary justify-center w-7/8 p-6 border-brand-light-400">
          <div className="flex flex-col w-3/4 m-2 gap-6">
            <div>
              <h1 className="text-5xl text-brand-primary">Login below!</h1>
              <p className="m-1 w-3/4">
                Choose a user from the right to start exploring the system. All
                users, products, and carts were found at{" "}
                <a
                  className="text-blue-400 underline"
                  target="_blank"
                  href="https://fakestoreapi.com"
                >
                  fakestoreapi.com
                </a>
              </p>
            </div>
            <p>Username</p>
            <input
              className="border-1 p-1 w-full border-brand-light-400 rounded-sm focus:border-brand-primary-500 focus:outline-none focus:border-2 focus:bg-brand-primary-100"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <p>Password</p>
            <input
              className="border-1 p-1 w-full border-brand-light-400 rounded-sm focus:border-brand-primary-500 focus:outline-none focus:border-2 focus:bg-brand-primary-100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !disabled) {
                  handleLogin()
                }
              }}
              type="password"
            />
          </div>
          <button
            className={`w-3/4 p-2 rounded-md
              ${disabled
                ? 'bg-brand-primary-900 text-brand-light-400 cursor-not-allowed'
                : 'bg-brand-primary text-brand-light cursor-pointer hover:text-brand-accent hover:scale-105 hover:shadow-sm'
              }
              `}
            // className="w-3/4 bg-brand-primary text-brand-accentbg-brand-primary text-brand-light p-2 rounded-md hover:text-brand-accent hover:cursor-pointer hover:scale-105 hover:shadow-sm"
            onClick={handleLogin}
            disabled={loading || disabled}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && (
            <div className="w-3/4 text-left">
              <p className="text-brand-accent">
                {error}. <br />
                Please enter the username and password from a user on the right.
              </p>
            </div>
          )}
        </div>
        <UserGrid />
      </div>
    </div>
  );
}
