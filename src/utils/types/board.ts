import { Workshop } from "./workshop";
import { ITimestamp } from "./timestamp";

export interface Board extends ITimestamp {
  id: string;
  name: string;
  description: string;
  workshop: Workshop;
}

export type WorkshopBoardRef = { id: string };

export interface IBoardCreate {
  name: string;
  description: string;
  workshopId: string;
}
