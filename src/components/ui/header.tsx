"use client";
import { ReactNode, useContext } from "react";
import { ShoppingCart, User, LogOut } from "lucide-react";
import { motion, HTMLMotionProps, useAnimation } from "framer-motion";
import { useRouter } from "next/navigation";

import ShopDropIcon from "./shop-drop-icon/shop-drop";
import AuthContext from "../auth/context";
import { cn } from "@/lib/utils/cn";

export function Header() {
  const { logout, userId } = useContext(AuthContext);
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 bg-brand-primary text-brand-light shadow-xl h-[64px]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/*Logo*/}
          <div
            className="flex items-center space-x-8 text-brand-accent cursor-pointer"
            onClick={() => router.push("/")}
          >
            <ShopDropIcon size="40px" />
            <h1 className="text-2xl font-bold">ShopDrop</h1>
          </div>
          {/* Actions */}
          <div className="flex items-center space-x-4">
            <HeaderButton
              label="Profile"
              onClick={() => router.push(`/profile/${userId}`)}
            >
              <User className="h-6 w-6" />
            </HeaderButton>
            <HeaderButton label="Shopping Cart">
              <ShoppingCart className="h-6 w-6" />
            </HeaderButton>
            <HeaderButton
              onClick={() => {
                logout();
                router.push("/");
              }}
              label="Log Out"
            >
              <LogOut className="h-6 w-6" />
            </HeaderButton>
          </div>
        </div>
      </div>
    </header>
  );
}

type HeaderButtonProps = HTMLMotionProps<"button"> & {
  label: string;
  children: ReactNode;
};

function HeaderButton({
  label,
  children,
  className,
  ...props
}: HeaderButtonProps) {
  const controls = useAnimation();

  const handleEnter = () => {
    controls.start({ width: "auto", opacity: 1 });
  };

  const handleLeave = () => {
    controls.start({ width: 0, opacity: 0 });
  };

  return (
    <motion.button
      {...props}
      onMouseEnter={() => handleEnter()}
      onMouseLeave={() => handleLeave()}
      className={cn(
        "group flex items-center rounded-md border-0 px-3 py-2 hover:bg-brand-primary-600 hover:cursor-pointer hover:shadow-sm overflow-hidden",
        className
      )}
      whileHover={{ width: "auto" }}
      initial={{ width: "auto" }}
    >
      <div className="flex items-center space-x-2">
        {children}
        <motion.span
          className="whitespace-nowrap text-sm text-brand-light"
          initial={{ width: 0, opacity: 0 }}
          animate={controls}
          transition={{ duration: 0.4 }}
        >
          {label}
        </motion.span>
      </div>
    </motion.button>
  );
}
