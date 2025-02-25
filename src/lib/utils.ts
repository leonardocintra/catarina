import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function removerAcento(texto: string): string {
  return texto.normalize("NFD") // Separa acentos das letras
    .replace(/\p{Diacritic}/gu, "") // Remove acentos
    .replace(/ç/g, "c") // Substitui "ç" por "c")
    .replace(/Ç/g, "C"); // Substitui "Ç" por "C");
}

export const AmbrosioBaseUrl =
  process.env.NEXT_PUBLIC_AMBROSIO_URL || "http://localhost:3005";
export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";