import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

export default function EnderecoForm() {
  const onChangeCaptureHandler = (e: any) => {
    handleCep(e.target.value);
  };

  async function handleCep(cepInput: string) {
    if (cepInput.length !== 8) {
      //TODO: CEP tem 8 digitos mas so funciona com 7
      return;
    }

    const res = await fetch(`https://viacep.com.br/ws/${cepInput}/json/`)
      .then((res) => res.json())
      .then((res) => {
        return res;
      });

    console.log(res);

    form.setValue("bairro", res.bairro);
    form.setValue("cidade", res.localidade);
    form.setValue("uf", res.uf);
    form.setValue("logradouro", res.logradouro);
    if (res.logradouro === "") {
      form.setFocus("logradouro");
    } else {
      form.setFocus("numero");
    }
  }

  const formSchema = z.object({
    logradouro: z.string().max(50),
    numero: z.string().max(5),
    bairro: z.string().max(50),
    cep: z.string().min(8).max(8),
    cidade: z.string().max(50),
    uf: z.string().max(2).min(2),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cep: "",
      cidade: "",
      uf: "",
      logradouro: "",
      numero: "",
      bairro: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="max-w-md mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-2"
        >
          <FormField
            control={form.control}
            name="cep"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CEP</FormLabel>
                <FormControl onChangeCapture={onChangeCaptureHandler}>
                  <Input max={8} placeholder="CEP ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="logradouro"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logradouro</FormLabel>
                <FormControl>
                  <Input placeholder="Logradouro ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="numero"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numero</FormLabel>
                <FormControl>
                  <Input placeholder="Numero ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bairro"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bairro</FormLabel>
                <FormControl>
                  <Input placeholder="Bairro ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cidade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cidade</FormLabel>
                <FormControl>
                  <Input placeholder="Cidade ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="uf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <FormControl>
                  <Input placeholder="Estado ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
