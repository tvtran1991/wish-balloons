export interface BalloonData {
  id: string;
  createdAt: string;
  styleId: number;
  shapeId: number;
  wishText: string;
  category: string | null;
  displayName: string | null;
  privacy: "public" | "blurred_until_tap";
  reportCount: number;
  status: "active" | "hidden";
}

export interface BalloonListResponse {
  balloons: BalloonData[];
  nextCursor: string | null;
}
