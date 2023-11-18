import { ITimestamp } from "./timestamp";

export interface Board extends ITimestamp {
  id: string;
  name: string;
  description: string;
  workshopId: string;
}

export type WorkshopBoardRef = { id: string };

export interface IBoardCreate {
  name: string;
  description: string;
  workshopId: string;
}
