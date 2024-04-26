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
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { IPessoa } from "@/interfaces/IPessoa";
import { useToast } from "@/components/ui/use-toast";
import { IEndereco } from "@/interfaces/IEndereco";
import { useRouter } from "next/navigation";

type EnderecoFormProps = {
  pessoa: IPessoa;
  urlBase: string;
};

export default function EnderecoForm({ pessoa, urlBase }: EnderecoFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const [bairroDisabled, setBairroDisabled] = useState(false);
  const [cidadeDisabled, setCidadeDisabled] = useState(false);
  const [logradouroDisabled, setLogradouroDisabled] = useState(false);

  const onChangeCaptureHandler = (e: any) => {
    handleCep(e.target.value);
  };

  function limpaCampos() {
    form.setValue("bairro", "");
    form.setValue("cidade", "");
    form.setValue("logradouro", "");
    form.setValue("numero", "");
    form.setValue("uf", "");
    form.setValue("cep", "");
    form.setFocus("cep");
  }

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

    form.setValue("bairro", res.bairro);
    form.setValue("cidade", res.localidade);
    form.setValue("uf", res.uf);
    form.setValue("logradouro", res.logradouro);
    if (res.logradouro === "") {
      form.setFocus("logradouro");
      setBairroDisabled(false);
      setLogradouroDisabled(false);
    } else {
      form.setFocus("numero");
      setBairroDisabled(true);
      setLogradouroDisabled(true);
    }
    setCidadeDisabled(true);
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
    let url = `${urlBase}/api/ambrosio/endereco`;
    let method = "POST";

    const endereco: Partial<IEndereco> = {
      cep: values.cep,
      logradouro: values.logradouro,
      cidade: values.cidade,
      UF: values.uf,
      bairro: values.bairro,
      pessoaId: pessoa.id,
      numero: values.numero,
    };

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(endereco),
    });

    console.log(await res.status);

    if (res.status === 201 && method === "POST") {
      toast({
        title: `Endereço da pessoa`,
        variant: "default",
        description: `Cadastrado(a) com sucesso!`,
      });
      limpaCampos();
      router.push(`/dashboard/pessoas/${pessoa.id}`);
    } else {
      toast({
        title: `Endereço não foi cadastrado!`,
        variant: "destructive",
        description: `Erro: ${res.text}`,
      });
    }
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
                  <Input
                    disabled={logradouroDisabled}
                    placeholder="Logradouro ..."
                    {...field}
                  />
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
                  <Input
                    disabled={bairroDisabled}
                    placeholder="Bairro ..."
                    {...field}
                  />
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
                  <Input
                    disabled={cidadeDisabled}
                    placeholder="Cidade ..."
                    {...field}
                  />
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
                  <Input
                    disabled={cidadeDisabled}
                    placeholder="Estado ..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Salvar</Button>
        </form>
      </Form>
    </div>
  );
}
