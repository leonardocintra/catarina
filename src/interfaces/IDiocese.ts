import { IEndereco } from "./IEndereco";
import { ITipoDiocese } from "./ITipoDiocese";
export interface IDiocese {
  id: number;
  descricao: string;
  tipoDiocese: ITipoDiocese;
  observacao?: string;
  endereco: IEndereco;
}
