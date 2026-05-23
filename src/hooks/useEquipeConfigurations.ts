import { useEffect, useState } from "react";
import { CarismaEquipe, TipoEquipe } from "neocatecumenal";

interface UseEquipeConfigurationsReturn {
  tiposDeEquipe: TipoEquipe[];
  carismaEquipe: CarismaEquipe[];
  isLoading: boolean;
  error: Error | null;
}

export function useEquipeConfigurations(): UseEquipeConfigurationsReturn {
  const [tiposDeEquipe, setTiposDeEquipe] = useState<TipoEquipe[]>([]);
  const [carismaEquipe, setCarismaEquipe] = useState<CarismaEquipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [tiposResponse, carismaResponse] = await Promise.all([
          fetch(`/api/ambrosio/configuracoes/tipoEquipe`, {
            credentials: "include",
            cache: "force-cache",
          }),
          fetch(`/api/ambrosio/configuracoes/carismas/equipe`, {
            credentials: "include",
          }),
        ]);

        if (!tiposResponse.ok || !carismaResponse.ok) {
          throw new Error("Falha ao carregar configurações de equipe");
        }

        const [tiposData, carismaData] = await Promise.all([
          tiposResponse.json(),
          carismaResponse.json(),
        ]);

        setTiposDeEquipe(tiposData.data);
        setCarismaEquipe(carismaData.data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Erro desconhecido"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { tiposDeEquipe, carismaEquipe, isLoading, error };
}
