import { useState } from "react";
import styled from "styled-components";

interface ContainerProps {
  bgColor: string;
  borderColor: string;
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${props => props.bgColor};
  border-radius: 100px;
  border: 3px solid ${props => props.borderColor};
`;

interface CircleProps {
  bgColor: string;
  borderColor?: string;
  // ? 를 붙여주면 필수요소(required)가 아니게됨. 선택적 사용가능
  text?: string;
}

function Circle({ bgColor, borderColor, text = "default text" }: CircleProps) {
  // text = "default text" -> 디폴트 값 정해주기!
  const [counter, setCounter] = useState(0);
  // useState<number|string>(0) -> number 또는 string 타입이 될 수 있다고 알려주는 것

  return (
    <Container bgColor={bgColor} borderColor={borderColor ?? "bgColor"}>
      {text}
    </Container>
  );
  // ??앞에 값이 null이거나 undefined이면 오른쪽 값을,
  // 그렇지 않으면 왼쪽 값을 반환하는 논리연산자
}

export default Circle;
