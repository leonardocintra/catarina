import { IEndereco } from "./IEndereco";
import { ITipoDiocese } from "./ITipoDiocese";
import { ITipoLocalidade } from "./ITipoLocalidade";

export interface IDiocese {
  id: number;
  descricao: string;
  tipoDiocese: ITipoDiocese;
  observacao?: string;
  endereco: IEndereco;

}
