import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
  /* const onDragend = ({ draggableId, destination, source }: DropResult) => {
    // → 드래그가 끝났을 때 실행되는 함수
    if (!destination) return;
    // → 유저가 같은 자리에 dnd 했을 경우에는 종료
     setToDos(oldToDos => {
      const toDosCopy = [...oldToDos];
      // 1) Delete item on source.index
      // console.log("Delete item on", source.index);
      // console.log(toDosCopy);
      toDosCopy.splice(source.index, 1);
      // console.log("Deleted item");
      // console.log(toDosCopy);
      // 2) Put back the item on the destination.index
      // console.log("Put back", draggableId, "on ", destination.index);
      toDosCopy.splice(destination?.index, 0, draggableId);
      // console.log(toDosCopy);
      return toDosCopy;
    }); 
  }; */
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
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
          // "doing" : boardCopy
        };
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
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
