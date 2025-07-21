"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getAllBricks,
  getBrickById,
  getColors,
  deleteBrick,
  getStatuses,
} from "@/services/brickService";
import { BrickDTO } from "@/types/bricks";
import BrickFilters from "./components/BrickFilters";
import BrickTable from "./components/BrickTable";
import Pagination from "./components/Pagination";

export default function BrickListPage() {
  const [br] = useState<BrickDTO[]>([]);
  const [bricks, setBricks] = useState<BrickDTO[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [statusFilter, setStatusFilter] = useState("");
  const [colorFilter, setColorFilter] = useState("");
  const [defectiveFilter, setDefectiveFilter] = useState("");
  const [idSearch, setIdSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [availableColors, setAvailableColors] = useState<string[]>([]);
  const [availableStatuses, setAvailableStatuses] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchEnums();
  }, []);

  useEffect(() => {
    if (!isSearchMode) fetchBricks();
  }, [page, statusFilter, colorFilter, defectiveFilter, isSearchMode]);

  const fetchEnums = async () => {
    try {
      const [colors, statuses] = await Promise.all([
        getColors(),
        getStatuses(),
      ]);
      setAvailableColors(colors);
      setAvailableStatuses(statuses);
    } catch (error) {
      console.error("Erro ao carregar enums:", error);
    }
  };

  const fetchBricks = async () => {
    setLoading(true);
    try {
      const filters = {
        ...(statusFilter && { status: statusFilter }),
        ...(colorFilter && { color: colorFilter }),
        ...(defectiveFilter !== "" && {
          defective: defectiveFilter === "true",
        }),
      };
      const data = await getAllBricks(page, 10, filters);
      setBricks(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
      setError(null);
    } catch (error) {
      setError("Erro ao carregar tijolos");
      console.error("Erro ao carregar tijolos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchById = async () => {
    if (!idSearch || isNaN(Number(idSearch))) {
      setError("Por favor, insira um ID válido");
      return;
    }
    setLoading(true);
    try {
      const brick = await getBrickById(Number(idSearch));
      setBricks([brick]);
      setIsSearchMode(true);
      setError(null);
    } catch (error) {
      setError("Tijolo não encontrado");
      console.error("Erro ao buscar tijolo por ID:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setIdSearch("");
    setIsSearchMode(false);
    setPage(0);
    fetchBricks();
  };

  const handleViewDetails = (id: number) => router.push(`/brick/${id}`);

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja deletar este tijolo?")) return;
    
    try {
      await deleteBrick(id);
      
      if (isSearchMode) {
        handleClearSearch();
      } else {
        fetchBricks();
      }
    } catch (error: any) {
      setError(error.message || "Ocorreu um erro inesperado.");
      console.error("Falha ao deletar:", error);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Listagem de Tijolos
        </h1>
        <button
          onClick={() => router.push("/create")}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Criar Tijolo
        </button>
      </div>
      <BrickFilters
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        colorFilter={colorFilter}
        setColorFilter={setColorFilter}
        defectiveFilter={defectiveFilter}
        setDefectiveFilter={setDefectiveFilter}
        idSearch={idSearch}
        setIdSearch={setIdSearch}
        availableColors={availableColors}
        availableStatuses={availableStatuses}
        onSearch={handleSearchById}
        onClearSearch={handleClearSearch}
        onClearFilters={() => {
          setStatusFilter("");
          setColorFilter("");
          setDefectiveFilter("");
          setPage(0);
        }}
        isSearchMode={isSearchMode}
      />
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}
      {!isSearchMode && (
        <div className="text-sm text-gray-600">
          Mostrando {bricks.length} de {totalElements} tijolos
        </div>
      )}
      <BrickTable
        bricks={bricks}
        onViewDetails={handleViewDetails}
        onDelete={handleDelete}
      />
      {!isSearchMode && totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
