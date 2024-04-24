import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const AmbrosioBaseUrl =
  process.env.AMBROSIO_URL || "http://localhost:3005";
export const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

// apagar se nao for usar swr
// export const fetcher = (...args: Parameters<typeof fetch>) =>
//   fetch(...args).then((res) => res.json());
