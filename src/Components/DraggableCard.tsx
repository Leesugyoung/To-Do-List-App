import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import React from "react";
import { Snapshot } from "recoil";

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${props =>
    props.isDragging ? "#d4eaff" : props.theme.cardColor};
  box-shadow: ${props =>
    props.isDragging ? "2px 0px 5px rgba(0, 0, 0, 0.05)" : "none"};
`;

interface IDragabbleCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

function DragabbleCard({ toDoId, toDoText, index }: IDragabbleCardProps) {
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {/*  number 형식인 toDoId 를 +"" 를 붙여 string 으로 변환 */}
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {toDoText}
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
