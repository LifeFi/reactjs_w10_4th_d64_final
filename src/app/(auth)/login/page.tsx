"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSWRConfig } from "swr";

interface ILoginForm {
  email: string;
}

export default function LogIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const onValid = async (data: ILoginForm) => {
    if (isLoading) return;
    setIsLoading(true);

    const request = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await request.json();
    // console.log(request);
    console.log(json);

    if (request.status === 200) {
      console.log("login success!");
      // mutate 하더라도, statle 되기만 하고, useSWR 즉시 호출시, 이전 값을 반환 받음.
      // => 따라서, mutate 할때 직접 값을 넣어서 업데이트 해버림.
      // const result = await mutate("/api/users/me");

      const { message, ...updatedUser } = json;
      const result = await mutate("/api/users/me", { ...updatedUser });
      console.log("mutate result", result);
      router.push("/");
    } else {
      alert(json.message);
    }

    setIsLoading(false);
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onValid)}>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            {...register("email", { required: "Write your email please." })}
          />
          <span>{errors?.email?.message}</span>
        </div>
        <button>Login</button>
        <div>
          <br />
          ⚠️ 주의
          <br />
          codesandbox 내부 Preview 이용시 <br />
          쿠키 정책으로 로그인이 정상적이지 않을 수 있으니 <br />
          <b>Preview를 전체 창으로 띄워서 테스트 해주세요.</b>
        </div>
      </form>
    </div>
  );
}
