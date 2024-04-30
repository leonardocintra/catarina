import { IEndereco } from "./IEndereco";
import { IEscolaridade } from "./IEscolaridade";
import { IEstadoCivil } from "./IEstadoCivil";
import { ITipoCarisma } from "./ITipoCarisma";
import { ITipoPessoa } from "./ITipoPessoa";

export interface IPessoa {
  id: number;
  nome: string;
  estadoCivil: IEstadoCivil;
  escolaridade: IEscolaridade;
  tipoCarisma: ITipoCarisma;
  tipoPessoa: ITipoPessoa;
  sexo: string;
  nacionalidade: string;
  enderecos: IEndereco[];
}
