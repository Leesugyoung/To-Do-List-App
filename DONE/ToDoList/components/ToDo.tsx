import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDostate } from "./atoms";

const ToDoBtn = styled.button`
  border: 1px solid whitesmoke;
  border-radius: 10px;
  margin: 0 5px;
  font-size: 12px;
  background-color: transparent;
  color: white;
`;

const ToDoText = styled.span`
  font-size: 16px;
`;

const ToDoList = styled.li`
  margin: 10px 10px;
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDostate);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos(oldToDos => {
      const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <ToDoList>
      <ToDoText>✏️ {text}</ToDoText>
      {category !== Categories.TO_DO && (
        <ToDoBtn name={Categories.TO_DO} onClick={onClick}>
          To do
        </ToDoBtn>
      )}
      {category !== Categories.DOING && (
        <ToDoBtn name={Categories.DOING} onClick={onClick}>
          Doing
        </ToDoBtn>
      )}
      {category !== Categories.DONE && (
        <ToDoBtn name={Categories.DONE} onClick={onClick}>
          Done
        </ToDoBtn>
      )}
    </ToDoList>
  );
}

export default ToDo;
