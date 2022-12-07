import { atom, selector } from "recoil";

export interface IToDo {
  id: number;
  text: string;
}

export interface IToDoState {
  [key: string]: IToDo[];
}

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
      // 연결된 atom의 값을 초기화 해주는 함수
    }

    onSet((newValue: any, _: any, isReset: boolean) => {
      // atom의 값이 변경이 되었을 때 실행되는 함수
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const toDoState = atom<IToDoState>({
  key: "toDo",
  // 로컬스토리지에 저장되는 key값
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
  },
  effects: [localStorageEffect("toDo")],
});
