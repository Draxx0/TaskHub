import { Workshop } from "./workshop";
import { ITimestamp } from "./timestamp";
import { FirebaseDocData } from "./firebase";

export interface Board extends ITimestamp {
  id: string;
  name: string;
  description: string;
  workshop: Workshop;
}

export interface IBoardCreate<T> {
  name: string;
  description: string;
  workshop: FirebaseDocData<T>;
}
