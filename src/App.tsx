import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";
import AddBoard from "./Components/AddBoard";
import { Helmet } from "react-helmet";

const TitleWrapper = styled.div`
  display: flex;
  margin-top: 30px;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  max-width: 1200px;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 91vh;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

// draggableId: 드래그 되었던 Draggable의 id
// type: 드래그 되었던 Draggable의 type
// source: Draggable이 시작된 위치
// destination: Draggable이 끝난 위치

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      // same board movement!!
      setToDos(allBoards => {
        const boardCopy = [...allBoards[source.droppableId]];
        // 1. board 를 받아서
        const taskObj = boardCopy[source.index];
        // 2. taskObj 에 to do obj 전체를 받고
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        // 3. to do obj 를 다시 넣어준다.
        console.log("같은보드에서 움직일때", taskObj);
        const result = {
          ...allBoards,
          [source.droppableId]: boardCopy,
          // "doing" : boardCopy
        };
        return result;
      });
    }
    if (destination.droppableId !== source.droppableId) {
      // cross board movment!!
      setToDos(allBoards => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, taskObj);
        const result = {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
        return result;
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Helmet>
        <title>To Do List📝</title>
      </Helmet>
      <TitleWrapper>
        <AddBoard />
      </TitleWrapper>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map(boardId => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
