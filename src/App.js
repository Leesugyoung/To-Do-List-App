import styled, { keyframes } from "styled-components";

// styled-components practice

/* const Input = styled.input.attrs({ required: true })`
  // → 컴포넌트 속성값 설정 가능!
  background-color: tomato;
`; */
// as="" 을 사용하여 엘리먼트를 다른 엘리먼트로 교체할 수 있다!

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100th;
  justify-content: center;
  align-items: center;
`;

const ratationAnimation = keyframes`
  0% {
    transform: rotate(0deg);
    border-radius: 0px;
  } 50% {
    border-radius: 100px;
  }

  100% {
    transform: rotate(360deg);
    border-radius: 0px;  
  }
`;

const Emoji = styled.span`
  font-size: 36px;
`;

const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${ratationAnimation} 1s linear infinite;
  ${Emoji}:hover {
    // span - <Box> 안에있는 <span> 태그 선택!
    // Emoji - <Box> 안에 있는 <Emoji> 컴포넌트 선택!
    // &:hover → span:hover 와 같음!
    font-size: 98px;
  }
`;

function App() {
  return (
    <Wrapper>
      <Box>
        <Emoji>⭐</Emoji>
      </Box>
    </Wrapper>
  );
}

export default App;
