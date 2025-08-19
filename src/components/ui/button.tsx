import { cn } from "@/lib/utils/cn";
import { ComponentProps } from "react";

export default function BrandButton({ className, ...props }: ComponentProps<"button">) {
  return (
    <button
      className={cn(
        "bg-brand-primary text-brand-light p-2 rounded-md hover:text-brand-accent hover:cursor-pointer hover:scale-105 hover:shadow-sm",
        className
      )}
      {...props}
    />
  );
}

