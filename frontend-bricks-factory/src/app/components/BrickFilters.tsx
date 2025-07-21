"use client";

import { Dispatch, SetStateAction } from "react";
import { getStatusDisplay } from "../utils/usefulFunctions";

interface BrickFiltersProps {
  statusFilter: string;
  setStatusFilter: Dispatch<SetStateAction<string>>;
  colorFilter: string;
  setColorFilter: Dispatch<SetStateAction<string>>;
  defectiveFilter: string;
  setDefectiveFilter: Dispatch<SetStateAction<string>>;
  idSearch: string;
  setIdSearch: Dispatch<SetStateAction<string>>;
  availableColors: string[];
  availableStatuses: string[];
  onSearch: () => void;
  onClearSearch: () => void;
  onClearFilters: () => void;
  isSearchMode: boolean;
}

export default function BrickFilters({
  statusFilter,
  setStatusFilter,
  colorFilter,
  setColorFilter,
  defectiveFilter,
  setDefectiveFilter,
  idSearch,
  setIdSearch,
  availableColors,
  availableStatuses,
  onSearch,
  onClearSearch,
  onClearFilters,
  isSearchMode,
}: BrickFiltersProps) {


  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todos</option>
            {availableStatuses.map((status) => (
              <option key={status} value={status}>
                {getStatusDisplay(status)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cor
          </label>
          <select
            value={colorFilter}
            onChange={(e) => setColorFilter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todas</option>
            {availableColors.map((color) => (
              <option key={color} value={color}>
                {(color)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Defeito
          </label>
          <select
            value={defectiveFilter}
            onChange={(e) => setDefectiveFilter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todos</option>
            <option value="true">Com Defeito</option>
            <option value="false">Sem Defeito</option>
          </select>
        </div>
        <div className="flex items-end">
          <button
            onClick={onClearFilters}
            className="w-full px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Limpar Filtros
          </button>
        </div>
      </div>
      <div className="border-t pt-4 mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Buscar por ID
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            value={idSearch}
            onChange={(e) => setIdSearch(e.target.value)}
            placeholder="Digite o ID do tijolo"
            className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyPress={(e) => e.key === "Enter" && onSearch()}
          />
          <button
            onClick={onSearch}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Buscar
          </button>
          {isSearchMode && (
            <button
              onClick={onClearSearch}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              Limpar Busca
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
