import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getInitials(name?: string, email?: string) {
  const base = (name && name.trim()) || email || "";
  if (!base) return "?";
  const parts = base
    .replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  const letters = parts.length >= 2 ? parts[0][0] + parts[1][0] : parts[0][0];
  return letters.toUpperCase();
}