import { IEndereco } from "./IEndereco";
import { IEscolaridade } from "./IEscolaridade";
import { IEstadoCivil } from "./IEstadoCivil";
import { IPessoaConjugue } from "./IPessoaConjugue";
import { ITipoCarisma } from "./ITipoCarisma";
import { ITipoPessoa } from "./ITipoPessoa";

export interface IPessoa {
  id: number;
  nome: string;
  estadoCivil: IEstadoCivil;
  conjugue: IPessoaConjugue;
  escolaridade: IEscolaridade;
  tipoCarisma: ITipoCarisma;
  tipoPessoa: ITipoPessoa;
  sexo: string;
  nacionalidade: string;
  enderecos: IEndereco[];
}
