"use client";

import { useState, useEffect } from "react";
import { getStatistics } from "@/services/brickService";
import { BrickStatisticsDTO } from "@/types/bricks";
import StatCard from "../components/StatCard";

export default function BrickStatisticsPage() {
  const [stats, setStats] = useState<BrickStatisticsDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    setLoading(true);
    try {
      const data = await getStatistics();
      setStats(data);
      setError(null);
    } catch (error) {
      setError("Erro ao carregar estatísticas");
      console.error("Erro ao carregar estatísticas:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );

  if (error)
    return (
      <div className="max-w-7xl mx-auto bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center">
        {error}
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">
        Relatório Estatístico
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats &&
          Object.entries(stats).map(([key, value]) => (
            <StatCard
              key={key}
              statName={key as keyof BrickStatisticsDTO}
              value={value}
            />
          ))}
      </div>
    </div>
  );
}
