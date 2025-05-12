import { z } from "zod";

export const addressSchema = z.object({
  logradouro: z.string().max(50),
  numero: z.string().max(5, { message: "Tamanho máximo é 5 caracteres." }),
  bairro: z.string().max(50, { message: "Tamanho máximo é 50 caracteres." }),
  cep: z
    .string({ message: "O CEP é obrigatório" })
    .min(8, { message: "O CEP precisa ter 8 dígitos" })
    .max(8, { message: "O CEP precisa ter 8 dígitos" }),
  cidade: z
    .string({ message: "Nome da cidade é obrigatório" })
    .min(2, { message: "Cidade precisa ter no mínimo 2 caracteres" })
    .max(50, { message: "Tamanho máximo é 50 caracteres." }),
  uf: z
    .string({ message: "Obrigatório informar o estado" })
    .length(2, { message: "Obrigatório ter 2 caracteres" }),
});
