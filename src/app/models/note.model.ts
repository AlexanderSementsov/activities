import {IconType} from "./icon-type.type";

export interface Note {
  id: number;
  user: string;
  timestamp: Date;
  type: IconType
  content: string;
}
