import { useContext, useState } from "react";
import AuthContext from "./context";
import UserGrid from "@/components/user/user-grid";
import ShopDropIcon from "@/components/ui/shop-drop-icon/shop-drop";
import BrandButton from "../ui/button";

export default function LoginForm() {
  const { login, loading, error } = useContext(AuthContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    await login(username, password);
  };

  const disabled = username === "" || password === "";

  return (
    <div className="flex justify-center items-center w-full h-screen bg-brand-primary">
      <div className="grid grid-cols-[2fr_1fr] w-full">
        <div className="font-sans flex flex-col gap-4 items-center text-brand-accent justify-center w-7/8 p-6 border-brand-light-400">
          <div className="flex flex-col w-3/4 m-2 gap-6">
            <div className="flex flex-col mb-5 gap-4">
              <div className="flex gap-8 items-center">
                <ShopDropIcon size="60px" />
                <h1 className="text-5xl text-brand-accent">
                  Welcome to ShopDrop!
                </h1>
              </div>

              <p className="m-1 w-3/4">
                To login, choose a user from the right to start exploring the
                system. <br />
                All users, products, and carts were found at{" "}
                <a
                  className="text-brand-accent-400 underline"
                  target="_blank"
                  href="https://fakestoreapi.com"
                >
                  fakestoreapi.com
                </a>
              </p>
            </div>
            <p>Username</p>
            <input
              className="border-1 p-1 w-full border-brand-accent rounded-sm text-brand-accent focus:outline-none focus:border-2 focus:bg-brand-primary-600 focus:text-brand-accent"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <p>Password</p>
            <input
              className="border-1 p-1 w-full border-brand-accent rounded-sm text-brand-accent focus:outline-none focus:border-2 focus:bg-brand-primary-600 focus:text-brand-accent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !disabled) {
                  handleLogin();
                }
              }}
              type="password"
            />
          </div>
          <BrandButton
            className={`w-3/4 text-brand-primary ${
              disabled ?
              "bg-brand-accent-900 text-brand-light-900 hover:text-brand-light-900 hover:cursor-not-allowed hover:scale-100 hover:shadow-none"
            : "bg-brand-accent hover:text-brand-primary hover:font-semibold"}`}
            onClick={handleLogin}
            disabled={loading || disabled}
          >
            {loading ? "Logging in..." : "Login"}
          </BrandButton>

          {error && (
            <div className="w-3/4 text-left">
              <p className="text-brand-primary">
                {error}. <br />
                Please enter the username and password from a user on the right.
              </p>
            </div>
          )}
        </div>
        <div className="h-screen bg-brand-primary w-full">
          <UserGrid />
        </div>
      </div>
    </div>
  );
}
