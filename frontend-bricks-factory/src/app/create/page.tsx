"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getColors } from "@/services/brickService";
import { CreateBrickRequest } from "@/types/bricks";
import ManualBrickForm from "../components/ManualBrickForm";
import RandomBrickButton from "../components/RandomBrickButton";

export default function BrickCreatePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availableColors, setAvailableColors] = useState<string[]>([]);
  const [formData, setFormData] = useState<CreateBrickRequest>({
    color: "",
    holes: 1,
  });

  useEffect(() => {
    fetchColors();
  }, []);

  const fetchColors = async () => {
    try {
      const colors = await getColors();
      setAvailableColors(colors);
      if (colors.length > 0)
        setFormData((prev) => ({ ...prev, color: colors[0] }));
    } catch (error) {
      console.error("Erro ao carregar cores:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Criar Tijolo</h1>
        <p className="mt-2 text-gray-600">
          Crie um novo tijolo manualmente ou gere um aleatório
        </p>
      </div>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ManualBrickForm
          formData={formData}
          setFormData={setFormData}
          availableColors={availableColors}
          loading={loading}
          setLoading={setLoading}
          setError={setError}
          onSuccess={(id: number) => router.push(`/brick/${id}`)}
        />
        <RandomBrickButton
          loading={loading}
          setLoading={setLoading}
          setError={setError}
          onSuccess={(id: number) => router.push(`/brick/${id}`)}
        />
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => router.push("/")}
          className="px-6 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
        >
          Voltar à Listagem
        </button>
      </div>
    </div>
  );
}
