import { atom } from "recoil";

export interface IToDo {
  text: string;
  category: "TO_DO" | "DOING" | "DONE";
  id: number;
}

export const toDostate = atom<IToDo[]>({
  key: "toDo",
  default: [],
});
