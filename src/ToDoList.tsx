import { DeferredData } from "@remix-run/router/dist/utils";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { shouldProcessLinkClick } from "react-router-dom/dist/dom";

interface IFrom {
  email: string;
  FirstName: string;
  LastName: string;
  UserName: string;
  Password: string;
  Password1: string;
  extraError?: String;
}

function TodoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IFrom>({
    defaultValues: {
      // placeholder 와 유사, 화면에 표출되는 기본 값
      email: "@naver.com",
    },
  });
  const onValid = (data: IFrom) => {
    if (data.Password !== data.Password1) {
      // 직접 에러를 설정하는 방법
      setError(
        "Password1",
        { message: "Password are not the same!" },
        { shouldFocus: true }
        // → Password1 에 커서가 포커스 처리되도록
      );
    }
    // setError("extraError", { message: "Server offline." });
    // → form 전체에 해당되는 에러!
  };
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        {/* handleSubmit → 데이터가 유효할때만 함수를 호출한다. */}
        <input
          {...register("email", {
            required: "Eamil is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com emails allowed",
            },
          })}
          placeholder="Eamil"
        />
        <span> {errors?.email?.message}</span>
        <input
          {...register("FirstName", {
            required: "Write here",
            validate:
              // value => value.includes("nico") ? "NO nicos allowed" : true,
              // value 가 nico 를 포함하고 있다면 "NO nicos allowed" 출력
              // 그렇지 않다면 통과~
              // === validate : { (value) => !value.includes("nico") || "error message"}
              {
                noNico: value =>
                  // 규칙 이름은 원하는걸로 아무렇게나 정할 수 있다!
                  value.includes("Nico") ? "NO nicos allowed" : true,
                noNick: value =>
                  value.includes("Nick") ? "NO Nicks allowed" : true,
              },
          })}
          placeholder="First Name"
        />
        <span> {errors?.FirstName?.message}</span>
        <input
          {...register("LastName", { required: "Write here" })}
          placeholder="Last Name"
        />
        <span> {errors?.LastName?.message}</span>
        <input
          {...register("UserName", { required: "Write here", minLength: 10 })}
          placeholder="UserName"
        />
        <span> {errors?.UserName?.message}</span>
        <input
          {...register("Password", {
            required: "Write here",
            minLength: 5,
          })}
          placeholder="Password"
        />
        <span> {errors?.Password?.message}</span>
        <input
          {...register("Password1", {
            required: "password is required",
            minLength: {
              value: 5,
              message: "Your password is too short",
            },
          })}
          placeholder="Password Confirmation"
        />
        <span> {errors?.Password1?.message}</span>
        <button>Add</button>
        <span> {errors?.extraError?.message}</span>
      </form>
    </div>
  );
}

/* react-hook-form 을 사용하지 않은 코드  
function TodoList() {
  const [toDo, setToDo] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setToDo(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    console.log(toDo);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={toDo} placeholder="Write a to do" />
        <button>Add</button>
        {toDoError !== "" ? toDoError : null}
      </form>
    </div>
  );
} */

export default TodoList;
