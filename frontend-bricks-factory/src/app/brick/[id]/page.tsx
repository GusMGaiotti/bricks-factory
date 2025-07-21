"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getBrickById, getStatuses } from "@/services/brickService";
import { BrickDTO } from "@/types/bricks";
import StatusUpdateForm from "../../components/StatusUpdateForm";
import { getStatusColor, getStatusDisplay } from "@/app/utils/usefulFunctions";

export default function BrickDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  const [brick, setBrick] = useState<BrickDTO | null>(null);
  const [availableStatuses, setAvailableStatuses] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      setError("ID inválido");
      setLoading(false);
      return;
    }
    fetchBrick(Number(id));
    fetchStatuses();
  }, [id]);

  const fetchBrick = async (brickId: number) => {
    setLoading(true);
    try {
      const data = await getBrickById(brickId);
      setBrick(data);
      setError(null);
    } catch (error: any) {
      setError(
        error.response?.status === 404
          ? "Tijolo não encontrado"
          : "Erro ao carregar tijolo",
      );
      console.error("Erro ao carregar tijolo:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStatuses = async () => {
    try {
      const statuses = await getStatuses();
      setAvailableStatuses(statuses);
    } catch (error) {
      console.error("Erro ao carregar status:", error);
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
      <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center">
        {error}
        <button
          onClick={() => router.push("/")}
          className="mt-4 px-4 py-2 text-sm text-red-700 bg-red-100 rounded-md hover:bg-red-200 transition-colors"
        >
          Voltar à Listagem
        </button>
      </div>
    );

  if (!brick)
    return (
      <div className="max-w-2xl mx-auto text-center text-gray-500">
        Tijolo não encontrado
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md border">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Detalhes do Tijolo #{brick.id}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <p className="text-gray-600 font-medium">Cor</p>
          <p className="text-gray-900">{(brick.color)}</p>
        </div>
        <div>
          <p className="text-gray-600 font-medium">Número de Furos</p>
          <p className="text-gray-900">{brick.holes}</p>
        </div>
        <div>
          <p className="text-gray-600 font-medium">Status</p>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
              brick.status,
            )}`}
          >
            {getStatusDisplay(brick.status)}
          </span>
        </div>
        <div>
          <p className="text-gray-600 font-medium">Possui Defeito</p>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              brick.defective
                ? "bg-red-100 text-red-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {brick.defective ? "Sim" : "Não"}
          </span>
        </div>
      </div>

      <StatusUpdateForm
        brickId={brick.id}
        availableStatuses={availableStatuses}
        onStatusUpdate={setBrick}
      />

      <div className="mt-8 flex justify-center">
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
