import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ComboboxCasal } from "./dialog-casal-combobox";
import { useState } from "react";

type DialogProps = {
  sexo: string;
  pessoaId: number;
};

export function DialogPessoaCasada({ sexo, pessoaId }: DialogProps) {
  const conjugue = sexo === "MASCULINO" ? "mulher" : "marido";

  const [selectedConjugue, setSelectedConjugue] = useState<number>(0);
  const [vinculado, setVinculado] = useState<boolean>(false);

  const handleSelectConjugue = (conjugue: number) => {
    setSelectedConjugue(conjugue);
  };

  const vincularConjugue = (conjugue: number) => {
    setVinculado(true);
    alert(`Vincular ${pessoaId} com ${selectedConjugue}`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={() => setVinculado(false)} variant="outline">
          Informar {conjugue}
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Informar {conjugue}</DialogTitle>
          <DialogDescription>
            Atenção: a listagem é baseada no sexo e estado civil. Caso o nome
            não aparecer, verifique se o conjugue foi cadastrado corretamente.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              {conjugue.toUpperCase()}
            </Label>
            <ComboboxCasal
              conjugue={conjugue}
              onSelect={handleSelectConjugue}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant={vinculado ? "default" : "secondary"}
            onClick={() => vincularConjugue(selectedConjugue)}
          >
            {vinculado ? "Casal vinculado!" : `Vicular ${conjugue}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
