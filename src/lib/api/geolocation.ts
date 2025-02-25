"use server";

export const getTodosOsPaises = async () => {
  try {
    const paisesOnu = await fetch(`https://servicodados.ibge.gov.br/api/v1/paises/todos`, {
      cache: "force-cache"
    }).then((res) => (res.ok ? res.json() : { data: [] }));

    const somenteNomePais = Array.from(
      new Set(paisesOnu.map((p: { nome: { abreviado: string } }) => p.nome.abreviado))
    );

    return somenteNomePais;
  } catch (error) {
    // TODO: implentar erro/log
    console.error(error)
  }
}