export interface BrickDTO {
  id: number;
  color: string;
  holes: number;
  status: string;
  defective: boolean;
}

export interface BrickStatisticsDTO {
  whiteBricksEvenHoles: number;
  whiteBricksOddHoles: number;
  blackBricksEvenHoles: number;
  blackBricksOddHoles: number;
  whiteBricksTotal: number;
  blackBricksTotal: number;
  bricksInInspection: number;
  bricksApproved: number;
  bricksRejected: number;
  bricksDefective: number;
}

export interface UpdateStatusRequest {
  status: string;
}

export interface CreateBrickRequest {
  color: string;
  holes: number;
}
