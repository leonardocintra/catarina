"use client";

import { useState, useEffect } from "react";
import { BASE_URL } from "@/lib/utils";

export function useCarismasCount() {
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const endpoints = [
          `${BASE_URL}/api/ambrosio/configuracoes/carismas/primitivo`,
          `${BASE_URL}/api/ambrosio/configuracoes/carismas/servico`,
          `${BASE_URL}/api/ambrosio/configuracoes/carismas/vinculado`,
          `${BASE_URL}/api/ambrosio/configuracoes/situacaoReligiosa`
        ];

        const responses = await Promise.all(
          endpoints.map(endpoint => fetch(endpoint).then(res => res.json()))
        );

        const total = responses.reduce((sum, response) => {
          return sum + (response.data?.length || 0);
        }, 0);

        setTotalCount(total);
      } catch (error) {
        console.error("Erro ao buscar contagem de carismas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  return { totalCount, loading };
}
