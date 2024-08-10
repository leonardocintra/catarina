import { IEndereco } from "./IEndereco";
import { IEscolaridade } from "./IEscolaridade";
import { IEstadoCivil } from "./IEstadoCivil";
import { IPessoaConjugue } from "./IPessoaConjugue";
import { IPessoaCarisma } from "./IPessoaCarimas";
import { ITipoPessoa } from "./ITipoPessoa";

export interface IPessoa {
  id: number;
  nome: string;
  conhecidoPor: string;
  cpf: string;
  estadoCivil: IEstadoCivil;
  conjugue: IPessoaConjugue;
  escolaridade: IEscolaridade;
  carismas: IPessoaCarisma[];
  tipoPessoa: ITipoPessoa;
  sexo: string;
  nacionalidade: string;
  enderecos: IEndereco[];
}
