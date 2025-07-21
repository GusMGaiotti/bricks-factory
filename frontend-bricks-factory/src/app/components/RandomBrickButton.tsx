"use client";

import { Dispatch, SetStateAction } from "react";
import { createRandomBrick } from "@/services/brickService";

interface RandomBrickButtonProps {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
  onSuccess: (id: number) => void;
}

export default function RandomBrickButton({ loading, setLoading, setError, onSuccess }: RandomBrickButtonProps) {
  const handleCreateRandom = async () => {
    setLoading(true);
    setError(null);
    try {
      const newBrick = await createRandomBrick();
      onSuccess(newBrick.id);
    } catch (error) {
      setError("Erro ao criar tijolo aleatório");
      console.error("Erro ao criar tijolo aleatório:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Criação Aleatória</h2>
      <p className="text-gray-600 mb-4">
        Gere um tijolo com propriedades aleatórias definidas pelo sistema.
      </p>
      <button
        onClick={handleCreateRandom}
        disabled={loading}
        className="w-full px-4 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Gerando...
          </div>
        ) : (
          "Gerar Tijolo Aleatório"
        )}
      </button>
    </div>
  );
}