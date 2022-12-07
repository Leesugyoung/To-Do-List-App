import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import React from "react";
import { Snapshot, useRecoilState, useSetRecoilState } from "recoil";
import { IToDo, toDoState, IToDoState } from "../atoms";

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  background-color: ${props =>
    props.isDragging ? "#d4eaff" : props.theme.cardColor};
  box-shadow: ${props =>
    props.isDragging ? "2px 0px 5px rgba(0, 0, 0, 0.05)" : "none"};
  span:last-child {
    font-size: 12px;
  }
`;

interface IDragabbleCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
  boardId: string;
}

function DragabbleCard({
  boardId,
  toDoId,
  toDoText,
  index,
}: IDragabbleCardProps) {
  // 코드챌린지 - 리스트 삭제
  const setTodos = useSetRecoilState(toDoState);
  const handleDeleteTodo = (todoId: number): void => {
    setTodos((todos: IToDoState) => {
      const copiedTodos: IToDo[] = [...todos[boardId]];
      const filteredTodos: IToDo[] = copiedTodos.filter(
        (todo: IToDo) => todo.id !== todoId
      );
      const result = { ...todos, [boardId]: filteredTodos };

      return result;
    });
  };
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          <span>{toDoText}</span>
          <span onClick={() => handleDeleteTodo(toDoId)}>🗑️</span>
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DragabbleCard);
// → react.memo
// prop 값이 바뀐것만 컴포넌트만 렌더링시킴, prop 안바뀌면 렌더링x
// 정의
// : 컴포넌트가 동일한 props로 동일한 결과를 렌더링해낸다면, React.memo를 호출하고 결과를 메모이징(Memoizing)하도록 래핑하여 경우에 따라 성능 향상을 누릴 수 있습니다.
// 즉, React는 컴포넌트를 렌더링하지 않고 마지막으로 렌더링된 결과를 재사용합니다.
