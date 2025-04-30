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
    `${BASE_URL}/api/ambrosio/configuracoes/situacaoReligiosa`,
  ];

  const [estadoCivilRes, escolaridadeRes, situacoesReligiosaRes] =
    await Promise.all(
      urls.map((url) =>
        fetch(url).then((res) => (res.ok ? res.json() : { data: [] }))
      )
    );

  return {
    estadosCivilData: estadoCivilRes.data,
    escolaridadesData: escolaridadeRes.data,
    situacoesReligiosaData: situacoesReligiosaRes.data,
  };
}
