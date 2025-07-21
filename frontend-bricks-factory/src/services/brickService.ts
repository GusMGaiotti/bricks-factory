import {
  BrickDTO,
  BrickStatisticsDTO,
  UpdateStatusRequest,
  CreateBrickRequest,
} from "@/types/bricks";
import axios, { AxiosResponse } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const transformToBrickDTO = (data: any): BrickDTO => ({
  id: data.id,
  color: data.color,
  holes: parseInt(data.holes, 10) || data.holes,
  status: data.status,
  defective: data.defective,
});

export const getAllBricks = async (
  page: number = 0,
  size: number = 10,
  filters?: {
    color?: string;
    status?: string;
    defective?: boolean;
  },
): Promise<{
  content: BrickDTO[];
  totalPages: number;
  totalElements: number;
}> => {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("size", size.toString());

  if (filters?.color) {
    params.append(
      "color",
      filters.color
    );
  }
  if (filters?.status) {
    params.append("status", filters.status);
  }
  if (filters?.defective !== undefined) {
    params.append("defective", filters.defective.toString());
  }

  const response: AxiosResponse<{
    content: any[];
    totalPages: number;
    totalElements: number;
  }> = await axios.get(`${API_URL}?${params.toString()}`);
  return {
    ...response.data,
    content: response.data.content.map(transformToBrickDTO),
  };
};

export const getBrickById = async (id: number): Promise<BrickDTO> => {
  const response: AxiosResponse<any> = await axios.get(`${API_URL}/${id}`);
  return transformToBrickDTO(response.data);
};

export const createBrick = async (
  request: CreateBrickRequest,
): Promise<BrickDTO> => {
  console.log("Creating brick with request:", request);
  const transformedRequest = {
    ...request,
    color: request.color,
  };
  const response: AxiosResponse<any> = await axios.post(
    `${API_URL}`,
    transformedRequest,
  );
  console.log("Brick created:", response);
  return transformToBrickDTO(response.data);
};

export const createRandomBrick = async (): Promise<BrickDTO> => {
  const response: AxiosResponse<any> = await axios.post(`${API_URL}/random`);
  return transformToBrickDTO(response.data);
};

export const getStatistics = async (): Promise<BrickStatisticsDTO> => {
  const response: AxiosResponse<BrickStatisticsDTO> = await axios.get(
    `${API_URL}/statistics`,
  );
  return response.data;
};

export const updateBrickStatus = async (
  id: number,
  status: string,
): Promise<BrickDTO> => {
  const request: UpdateStatusRequest = { status };
  try {
    const response: AxiosResponse<any> = await axios.put(
      `${API_URL}/${id}/status`,
      request,
    );
    return transformToBrickDTO(response.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || "Erro ao atualizar status",
      );
    }
    throw new Error("Erro ao atualizar status");
  }
};

export const deleteBrick = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Erro ao deletar tijolo");
    }
    throw new Error("Erro ao deletar tijolo");
  }
};

export const getColors = async (): Promise<string[]> => {
  const response: AxiosResponse<string[]> = await axios.get(
    `${API_URL}/enums/colors`,
  );
  return response.data.map((color) =>
    color
  );
};

export const getStatuses = async (): Promise<string[]> => {
  const response: AxiosResponse<string[]> = await axios.get(
    `${API_URL}/enums/statuses`,
  );
  return response.data;
};
