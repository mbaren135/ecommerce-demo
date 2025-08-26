import { cn } from "@/lib/utils/cn";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "delete";
}

export default function BrandButton({
  className,
  disabled = false,
  variant = "primary",
  ...props
}: ButtonProps) {
  const variantStyles =
    variant === "primary"
      ? "bg-brand-primary text-brand-light p-2 rounded-md hover:text-brand-accent"
      : "bg-brand-accent-200 border-brand-accent border-2 text-brand-primary hover:text-brand-primary";

  const disabledStyles = !disabled
    ? "hover:scale-105 hover:cursor-pointer hover:shadow-sm"
    : `hover:cursor-not-allowed ${
        variant === "primary"
          ? "text-brand-light-600 hover:text-brand-light-600 bg-brand-primary-900"
          : "border-transparent text-brand-light-500 hover:text-brand-light-500"
      }`;

  return (
    <button
      {...props}
      className={cn("p-2 rounded-md", variantStyles, disabledStyles, className)}
    />
  );
}
