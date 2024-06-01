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

type DialogProps = {
  sexo: string;
};

export function DialogPessoaCasada({ sexo }: DialogProps) {
  const conjugue = sexo === "MASCULINO" ? "mulher" : "marido";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Informar {conjugue}</Button>
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
            <ComboboxCasal conjugue={conjugue} />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Vicular {conjugue}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
