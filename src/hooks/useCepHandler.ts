import { toast } from "@/components/ui/use-toast";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";

type UseCepHandlerProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  setBairroDisabled?: (val: boolean) => void;
  setLogradouroDisabled?: (val: boolean) => void;
  setCidadeDisabled?: (val: boolean) => void;
};

export function useCepHandler<T extends FieldValues>({
  form,
  setBairroDisabled,
  setLogradouroDisabled,
  setCidadeDisabled,
}: UseCepHandlerProps<T>) {
  return async function handleCep(cepInput: string) {
    const cep = cepInput.replace(/\D/g, "");

    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`).then((r) =>
      r.json()
    );

    if (res.erro) {
      form.setValue("bairro" as Path<T>, "" as any);
      form.setValue("cidade" as Path<T>, "" as any);
      form.setValue("uf" as Path<T>, "" as any);
      form.setValue("logradouro" as Path<T>, "" as any);
      form.setValue("numero" as Path<T>, "" as any);
      form.setFocus("cep" as Path<T>);

      toast({
        title: `CEP ${cepInput} não encontrado`,
        variant: "destructive",
        description: `Verifique se o CEP realmente existe`,
      });
    } else {
      form.setValue("bairro" as Path<T>, res.bairro);
      form.setValue("cidade" as Path<T>, res.localidade);
      form.setValue("uf" as Path<T>, res.uf);
      form.setValue("logradouro" as Path<T>, res.logradouro);

      if (res.logradouro === "") {
        form.setFocus("logradouro" as Path<T>);
        setBairroDisabled?.(false);
        setLogradouroDisabled?.(false);
      } else {
        form.setFocus("numero" as Path<T>);
        setBairroDisabled?.(true);
        setLogradouroDisabled?.(true);
      }

      setCidadeDisabled?.(true);
    }
  };
}
