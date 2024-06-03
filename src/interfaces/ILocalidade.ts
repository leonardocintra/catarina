import { IDiocese } from "./IDiocese";
import { IEndereco } from "./IEndereco";
import { ITipoLocalidade } from "./ITipoLocalidade";

export interface ILocalidade {
  id: number;
  descricao: string;
  diocese: IDiocese;
  tipoLocalidade: ITipoLocalidade;
  observacao: string;
  endereco: IEndereco;
}
