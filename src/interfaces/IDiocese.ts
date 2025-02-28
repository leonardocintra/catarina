import { ILocalidade } from "./ILocalidade";
import { ITipoDiocese } from "./ITipoDiocese";
export interface IDiocese {
  id: number;
  descricao: string;
  tipoDiocese: ITipoDiocese;
  observacao?: string;
  localidade: ILocalidade[]
}
