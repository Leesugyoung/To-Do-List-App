import styled, { keyframes } from "styled-components";

// styled-components practice

/* const Input = styled.input.attrs({ required: true })`
  // → 컴포넌트 속성값 설정 가능!
  background-color: tomato;
`; */
// as="" 을 사용하여 엘리먼트를 다른 엘리먼트로 교체할 수 있다!

const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
`;
const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vh;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundColor};
`;

function App() {
  return (
    <Wrapper>
      <Title>Hello</Title>
    </Wrapper>
  );
}

export default App;
