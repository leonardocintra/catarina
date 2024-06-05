"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { BASE_URL, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";

type ComboboxCasalProps = {
  conjugue: string;
  onSelect: (conjugue: number) => void;
};

interface IConjugue {
  id: number;
  nome: string;
}

export function ComboboxCasal({ conjugue, onSelect }: ComboboxCasalProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState(0);
  const [conjugues, setConjugues] = useState<IConjugue[]>([]);
  const sexo = conjugue === "marido" ? "M" : "F";

  useEffect(() => {
    const fetchData = async () => {
      async function getConjugues() {
        const res = await fetch(
          `${BASE_URL}/api/ambrosio/pessoa/conjugue?sexo=${sexo}`
        );
        return res.json();
      }
      const data = await getConjugues();
      setConjugues(data);
    };
    fetchData();
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[295px]"
        >
          {value
            ? conjugues.find((con) => con.nome === value)?.nome
            : `Conjugue - ${conjugue}`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[295px] p-0">
        <Command>
          <CommandInput placeholder={`Carregando ${conjugue} ...`} />
          <CommandList>
            <CommandEmpty>Nenhum {conjugue} encontrado ...</CommandEmpty>
            <CommandGroup>
              {conjugues.map((con) => (
                <CommandItem
                  key={con.id}
                  value={con.nome}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    setSelected(con.id);
                    onSelect(con.id);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === con.nome ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {con.nome}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
