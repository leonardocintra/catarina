import { IEscolaridade } from "./IEscolaridade";
import { IEstadoCivil } from "./IEstadoCivil";
import { ITipoCarisma } from "./ITipoCarisma";

export interface IPessoa {
  id: number;
  nome: string;
  estadoCivil: IEstadoCivil;
  escolaridade: IEscolaridade;
  tipoCarisma: ITipoCarisma;
}