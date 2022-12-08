import { Droppable } from "react-beautiful-dnd";
import DragabbleCard from "./DraggableCard";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { IToDo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

const Wrapper = styled.div`
  width: 300px;
  padding-top: 10px;
  background-color: ${props => props.theme.boardColor};
  border-radius: 5px;
  border: 1px solid white;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  max-width: 250px;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  font-size: 17px;
  color: #222222;
`;

const DelBoardBtn = styled.button`
  background-color: transparent;
  border: none;
  font-size: 12;
  :focus {
    border: none;
  }
  :hover {
    cursor: pointer;
  }
`;

const Area = styled.div<IAreaProps>`
  background-color: ${props =>
    props.isDraggingOver // board 위에 있을때
      ? "#f6ddf8"
      : props.isDraggingFromThis // board 떠날때
      ? "#f9e8fb"
      : "trnspernent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  border-radius: 5px;
  padding: 10px;
`;

const Form = styled.form`
  width: 90%;
  margin: 0 auto;
  input {
    width: 100%;
    background-color: transparent;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid #1f1f1f;
    text-align: center;
    height: 25px;
  }
  input:focus {
    outline: none;
  }
`;

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}

interface IFrom {
  toDo: string;
}

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

function Board({ toDos, boardId }: IBoardProps) {
  const SetToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IFrom>();
  const onValid = ({ toDo }: IFrom) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    SetToDos(allBoards => {
      const result = {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
      return result;
    });
    setValue("toDo", "");
  };
  // -- 코드챌린지 - board 삭제하기
  const deleteBoard = () => {
    SetToDos(allBoards => {
      const copyBoards = { ...allBoards };
      delete copyBoards[boardId];
      return { ...copyBoards };
    });
  };
  return (
    <Wrapper>
      <TitleWrapper>
        <Title>{boardId}</Title>
        {boardId !== "To Do" && boardId !== "Doing" && boardId !== "Done" && (
          <DelBoardBtn onClick={deleteBoard}>❌</DelBoardBtn>
        )}
      </TitleWrapper>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(
          magic,
          info // info == Snapshot
        ) => (
          <Area
            isDraggingOver={info.isDraggingOver}
            isDraggingFromThis={Boolean(info.draggingFromThisWith)}
            ref={magic.innerRef}
            // react js 컴포넌트를 통해 html 요소를 가져올 수 있음
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DragabbleCard
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
                boardId={boardId}
              />
            ))}

            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
