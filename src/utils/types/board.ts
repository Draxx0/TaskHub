import { Workshop } from "./workshop";
import { ITimestamp } from "./timestamp";

export interface Board extends ITimestamp {
  id: string;
  name: string;
  description: string;
  workshop: Workshop;
}

export interface IBoardCreate {
  name: string;
  description: string;
  workshopId: string;
}
