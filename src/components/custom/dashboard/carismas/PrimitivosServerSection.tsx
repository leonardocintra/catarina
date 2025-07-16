import { BASE_URL } from "@/lib/utils";
import { CarismaPrimitivo } from "neocatecumenal";

async function PrimitivosServerSection() {
  try {
    // Adiciona um pequeno delay para simular carregamento escalonado
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const res = await fetch(
      `${BASE_URL}/api/ambrosio/configuracoes/carismas/primitivo`,
      { cache: 'no-store' }
    );
    
    if (!res.ok) throw new Error('Erro ao carregar primitivos');
    const data = await res.json();
    const primitivos: CarismaPrimitivo[] = data.data;

    if (primitivos.length === 0) return null;

    return (
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Primitivos</h2>
        <ul className="list-disc pl-5">
          {primitivos.map((carisma) => (
            <li key={carisma.id} className="mb-2">
              <span className="font-normal">{carisma.descricao}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    console.error("Erro ao buscar primitivos:", error);
    return <div className="text-red-500">Erro ao carregar primitivos</div>;
  }
}

export default PrimitivosServerSection;
