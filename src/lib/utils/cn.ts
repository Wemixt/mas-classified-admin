import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes with clsx. Use for conditional and composed classNames.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
