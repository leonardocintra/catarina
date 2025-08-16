import { IMaskInput } from "react-imask";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface CepFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  onCepChange?: (cep: string) => void;
  disabled?: boolean;
}

export function CepField<T extends FieldValues>({
  control,
  name,
  label = "CEP",
  placeholder = "CEP...",
  onCepChange,
  disabled = false,
}: CepFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <IMaskInput
              mask="00000-000"
              placeholder={placeholder}
              value={field.value}
              disabled={disabled}
              onAccept={(value, mask) => {
                const numericCep = value.replace(/\D/g, ""); // remove hífen e tudo que não for número
                field.onChange(numericCep); // salva o valor limpo no react-hook-form

                // Chama callback personalizado quando CEP está completo
                if (numericCep.length === 8 && onCepChange) {
                  onCepChange(numericCep);
                }
              }}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
