"use client";

import { Dispatch, SetStateAction } from "react";
import { CreateBrickRequest } from "@/types/bricks";
import { createBrick } from "@/services/brickService";

interface ManualBrickFormProps {
  formData: CreateBrickRequest;
  setFormData: Dispatch<SetStateAction<CreateBrickRequest>>;
  availableColors: string[];
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
  onSuccess: (id: number) => void;
}

export default function ManualBrickForm({
  formData,
  setFormData,
  availableColors,
  loading,
  setLoading,
  setError,
  onSuccess,
}: ManualBrickFormProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "holes") {
      setFormData((prev) => ({ ...prev, [name]: parseInt(value) || 1 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmitManual = async () => {
    if (!formData.color) {
      setError("Por favor, selecione uma cor");
      return;
    }
    if (formData.holes < 1 || formData.holes > 20) {
      setError("O número de furos deve estar entre 1 e 20");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const newBrick = await createBrick(formData);
      onSuccess(newBrick.id);
    } catch (error) {
      setError("Erro ao criar tijolo");
      console.error("Erro ao criar tijolo:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Criação Manual</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
            Cor *
          </label>
          <select
            id="color"
            name="color"
            value={formData.color}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Selecione uma cor</option>
            {availableColors.map((color) => (
              <option key={color} value={color}>
                {(color)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="holes" className="block text-sm font-medium text-gray-700 mb-1">
            Número de Furos *
          </label>
          <input
            type="number"
            id="holes"
            name="holes"
            value={formData.holes}
            onChange={handleInputChange}
            min="1"
            max="20"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Digite o número de furos (1-20)"
          />
          <p className="mt-1 text-sm text-gray-500">Número entre 1 e 20</p>
        </div>
        <button
          onClick={handleSubmitManual}
          disabled={loading}
          className="w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Criando...
            </div>
          ) : (
            "Criar Tijolo"
          )}
        </button>
      </div>
    </div>
  );
}