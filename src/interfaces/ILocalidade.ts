import { Diocese } from "neocatecumenal";
import { IEndereco } from "./IEndereco";
import { ITipoLocalidade } from "./ITipoLocalidade";

export interface ILocalidade {
  id?: number;
  descricao?: string;
  diocese?: Diocese;
  tipoLocalidade?: ITipoLocalidade;
  observacao?: string;
  endereco: IEndereco;
}
