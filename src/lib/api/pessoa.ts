import { BASE_URL } from "../utils";

export async function getPessoa(pessoaId: number) {
  const res = await fetch(`${BASE_URL}/api/ambrosio/pessoa/${pessoaId}`);

  if (!res.ok) {
    return null;
  }
  return res.json();
}

export async function getDadosDaPessoa() {
  const urls = [
    `${BASE_URL}/api/ambrosio/configuracoes/estadoCivil`,
    `${BASE_URL}/api/ambrosio/configuracoes/escolaridade`,
    `${BASE_URL}/api/ambrosio/configuracoes/tipoPessoa`,
  ];

  const [estadoCivilRes, escolaridadeRes, tipoPessoaRes] = await Promise.all(
    urls.map((url) =>
      fetch(url).then((res) => (res.ok ? res.json() : { data: [] }))
    )
  );

  return {
    estadoCivils: estadoCivilRes.data,
    escolaridades: escolaridadeRes.data,
    tipoPessoas: tipoPessoaRes.data,
  };
}