"use client";

import { useState } from "react";
import { updateBrickStatus } from "@/services/brickService";
import { BrickDTO } from "@/types/bricks";
import { getStatusDisplay } from "../utils/usefulFunctions";

interface StatusUpdateFormProps {
  brickId: number;
  availableStatuses: string[];
  onStatusUpdate: (updatedBrick: BrickDTO) => void;
}

export default function StatusUpdateForm({
  brickId,
  availableStatuses,
  onStatusUpdate,
}: StatusUpdateFormProps) {
  const [newStatus, setNewStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdateStatus = async () => {
    if (!newStatus) {
      setError("Selecione um status válido");
      return;
    }
    setLoading(true);
    try {
      const updatedBrick = await updateBrickStatus(brickId, newStatus);
      onStatusUpdate(updatedBrick);
      setNewStatus("");
      setError(null);
    } catch (error: any) {
      setError(error.message || "Erro ao atualizar status");
      console.error("Erro ao atualizar status:", error);
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="border-t pt-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Atualizar Status
      </h2>
      {error && <p className="text-red-700 mb-2">{error}</p>}
      <div className="flex items-center space-x-4">
        <select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          disabled={loading}
          className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
          aria-label="Selecione um novo status"
        >
          <option value="">Selecione um novo status</option>
          {availableStatuses.map((status) => (
            <option key={status} value={status}>
              {getStatusDisplay(status)}
            </option>
          ))}
        </select>
        <button
          onClick={handleUpdateStatus}
          disabled={!newStatus || loading}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Atualizando..." : "Atualizar"}
        </button>
      </div>
    </div>
  );
}
