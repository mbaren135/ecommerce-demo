import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// cn = clsx + tailwind-merge
export function cn(...inputs: unknown[]) {
  return twMerge(clsx(inputs));
}
