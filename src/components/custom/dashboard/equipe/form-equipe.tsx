import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { CarismaEquipe, Equipe, TipoEquipe } from "neocatecumenal";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { X, Plus } from "lucide-react";

type EquipeFormProps = {
  urlBase: string;
  equipe?: Equipe;
  tiposDeEquipe: TipoEquipe[];
  pessoasComCarismaEquipe: CarismaEquipe[];
};

export default function EquipeForm({
  urlBase,
  equipe,
  tiposDeEquipe,
  pessoasComCarismaEquipe,
}: EquipeFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCarismas, setSelectedCarismas] = useState<CarismaEquipe[]>([]);
  const [searchCarismaEquipe, setSearchCarismaEquipe] = useState("");

  const equipesCarismaOrdenados = [...pessoasComCarismaEquipe].sort((a, b) =>
    a.pessoa.nome.localeCompare(b.pessoa.nome)
  );

  const carismasFiltrados = searchCarismaEquipe.trim()
    ? equipesCarismaOrdenados.filter((c) =>
        c.pessoa.nome.toLowerCase().includes(searchCarismaEquipe.toLowerCase())
      )
    : [];

  const carismasMostrados = carismasFiltrados.slice(0, 10);

  const adicionarEquipe = (carisma: CarismaEquipe) => {
    const jaAdicionado = selectedCarismas.some((c) => c.id === carisma.id);
    if (!jaAdicionado) {
      setSelectedCarismas([...selectedCarismas, carisma]);
    }
  };

  const removerPessoaEquipe = (id: number) => {
    setSelectedCarismas(selectedCarismas.filter((c) => c.id !== id));
  };

  const formSchema = z.object({
    descricao: z
      .string()
      .min(2, { message: "Descrição deve ter no minimo 2 caracteres." })
      .max(80, { message: "Descrição deve ter no máximo 80 caracteres." }),
    tipoEquipe: z.string().min(1, { message: "Tipo de equipe é obrigatório." }),
    observacao: z
      .string()
      .max(255, { message: "Observação deve ter no máximo 255 caracteres." })
      .optional(),
    pessoasComCarismaEquipeId: z.array(z.number()),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      descricao: equipe?.descricao || "",
      tipoEquipe: equipe?.tipoEquipe.id.toString() || "",
      observacao: equipe?.observacao || "",
      pessoasComCarismaEquipeId: [],
    },
  });

  const handleFormSubmit = (baseValues: z.infer<typeof formSchema>) => {
    const values = {
      ...baseValues,
      pessoasComCarismaEquipeId: selectedCarismas.map((c) => c.pessoa.id),
    };
    return handleSubmit(values);
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    let url = `${urlBase}/api/ambrosio/equipe`;
    let method = "POST";

    if (equipe) {
      url = `${url}/${equipe.id}`;
      method = "PATCH";
    }

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (res.status === 201 && method === "POST") {
        toast({
          title: `${values.descricao}`,
          variant: "default",
          description: `Cadastrado(a) com sucesso!`,
        });
        router.push(`/dashboard/equipes/${data.data.id}`);
      } else if (res.status === 200 && method === "PATCH") {
        toast({
          title: `${values.descricao}`,
          variant: "default",
          description: `Editado(a) com sucesso!`,
        });
        // Não redirecionamos na edição, apenas reabilitamos o botão
        setIsLoading(false);
      } else {
        if (res.status === 403 || res.status === 401) {
          toast({
            title: `${values.descricao} não foi cadastrado!`,
            variant: "destructive",
            description: `Você não tem permissão para cadastro / edição`,
          });
        } else if (res.status === 400) {
          toast({
            title: `${values.descricao} não foi cadastrado!`,
            variant: "destructive",
            description: `Erro: ${data.message}`,
          });
        } else {
          toast({
            title: `${values.descricao} não foi cadastrado!`,
            variant: "destructive",
            description: `Erro: ${res.text}`,
          });
        }
        setIsLoading(false);
      }
    } catch (error) {
      toast({
        title: `${values.descricao} não foi cadastrado!`,
        variant: "destructive",
        description: `Erro de conexão. Tente novamente.`,
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto sm:mt-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="flex flex-col gap-3"
        >
          <FormField
            control={form.control}
            name="descricao"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input placeholder="Descrição ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tipoEquipe"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Equipe</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={equipe?.tipoEquipe.id.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {tiposDeEquipe.map((tipoEquipe) => (
                      <SelectItem
                        key={tipoEquipe.descricao}
                        value={tipoEquipe.id.toString()}
                      >
                        {tipoEquipe.descricao}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="observacao"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Observação</FormLabel>
                <FormControl>
                  <Input placeholder="Observação ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo de Catequistas Selecionados */}
          <div className="mt-6">
            <FormLabel>Catequistas Selecionados</FormLabel>
            <div className="flex flex-wrap gap-2 mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-md min-h-10">
              {selectedCarismas.length > 0 ? (
                selectedCarismas.map((catequista) => (
                  <Badge key={catequista.id} variant="secondary">
                    {catequista.pessoa.nome}
                    <button
                      type="button"
                      onClick={() => removerPessoaEquipe(catequista.id)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))
              ) : (
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  Nenhum catequista selecionado
                </span>
              )}
            </div>
          </div>

          {/* Tabela de Catequistas Disponíveis */}
          <div className="mt-6">
            <FormLabel>Catequistas Disponíveis</FormLabel>
            <Input
              placeholder="Buscar catequista..."
              value={searchCarismaEquipe}
              onChange={(e) => setSearchCarismaEquipe(e.target.value)}
              className="mt-2 mb-2"
            />
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              {searchCarismaEquipe.trim()
                ? `${carismasFiltrados.length} resultado${
                    carismasFiltrados.length !== 1 ? "s" : ""
                  } encontrado${
                    carismasFiltrados.length !== 1 ? "s" : ""
                  } - Mostrando ${carismasMostrados.length} de ${
                    carismasFiltrados.length
                  }`
                : "Digite para buscar catequistas"}
            </div>
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead className="w-20 text-center">Ação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {searchCarismaEquipe.trim() &&
                  carismasMostrados.length > 0 ? (
                    carismasMostrados.map((equipeCarisma) => (
                      <TableRow key={equipeCarisma.id}>
                        <TableCell>{equipeCarisma.pessoa.nome}</TableCell>
                        <TableCell className="text-center">
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => adicionarEquipe(equipeCarisma)}
                            disabled={selectedCarismas.some(
                              (c) => c.id === equipeCarisma.id
                            )}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : searchCarismaEquipe.trim() &&
                    carismasFiltrados.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={2}
                        className="text-center text-gray-500"
                      >
                        Nenhum catequista encontrado
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={2}
                        className="text-center text-gray-500"
                      >
                        Digite no campo acima para buscar catequistas
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              equipe ? (
                <>
                  <Spinner />
                  &quot;Salvando...&quot;
                </>
              ) : (
                <>
                  <Spinner />
                  &quot;Cadastrando...&quot;
                </>
              )
            ) : (
              "Salvar"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
