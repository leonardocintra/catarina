import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowsUpFromLine } from "lucide-react";

interface PassarComunidadeDeEtapaProps {
  comunidadeId: string;
}

export function PassarComunidadeDeEtapa({
  comunidadeId,
}: PassarComunidadeDeEtapaProps) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="link" size="sm">
            Passar comunidade de etapa <ArrowsUpFromLine />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle>Etapa Shemá Israel</DialogTitle>
            <DialogDescription>
              Preencha as informaçõs abaixo para confirmar a passagem de etapa
              da comunidade.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="catequistas">Catequistas</Label>
              <Input
                id="catequistas"
                name="name"
                placeholder="João e Maria, Pedro e Fernanda ..."
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="local-convivencia">Local da convivência</Label>
              <Input
                id="local-convivencia"
                name="local-convivencia"
                placeholder="Nuporanga - SP"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="data-convivencia">Data</Label>
              <Input
                id="data-convivencia"
                name="data-convivencia"
                placeholder="Nuporanga - SP"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="observacoes">Observações</Label>
              <Input
                id="observacoes"
                name="observacoes"
                placeholder="Alguma observação relevante ..."
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit" onClick={() => alert('Calma que ainda não implementei ...')}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
