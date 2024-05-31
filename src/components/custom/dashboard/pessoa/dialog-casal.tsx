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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Informar {conjugue}</DialogTitle>
          <DialogDescription>
            A listagem é baseada no cadastro do sexo da pessoa
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              {conjugue.toUpperCase()}
            </Label>
            <Input id="name" defaultValue="" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Vicular {conjugue}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
