import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";

const FORM = styled.form`
  display: flex;
  align-items: center;
  position: relative;
  input {
    width: 250px;
    background-color: transparent;
    border-bottom: 1px solid black;
    border-top: none;
    border-left: none;
    border-right: none;
    height: 30px;
    text-align: center;
    margin-right: 10px;
    font-size: 16px;
    height: 40px;
    :focus {
      outline: none;
    }
    :focus::-webkit-input-placeholder {
      color: transparent;
    }
  }
`;

const AddBtn = styled.button`
  background-color: #ffd7fa;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50px;
  position: relative;
  div {
    position: absolute;
    top: 5px;
    left: 6px;
  }
`;

interface IForm {
  category: string;
}

// 코드챌린지 - Board 추가하기
function AddBoard() {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onVaild = ({ category }: IForm) => {
    setToDos(prev => {
      return {
        ...prev,
        [category]: [],
      };
    });
    setValue("category", "");
  };
  return (
    <>
      <FORM onSubmit={handleSubmit(onVaild)}>
        <input
          {...register("category")}
          type="text"
          placeholder="Add To Category 📝"
        />
        <AddBtn>
          <div>➕</div>
        </AddBtn>
      </FORM>
    </>
  );
}

export default AddBoard;
