"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface ICreateAccountForm {
  name: string;
  email: string;
}

export default function CreateAccount() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateAccountForm>();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const onValid = async (data: ICreateAccountForm) => {
    if (isLoading) return;
    setIsLoading(true);

    const request = await fetch("/api/users/create-account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await request.json();
    // console.log(request.status);
    // console.log(json);
    if (request.status === 200 || request.status === 201) {
      alert(json.message);
      router.push("/login");
    } else if (request.status !== 405) {
      alert(json.message);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <h1>Create Accoumnt</h1>
      <form onSubmit={handleSubmit(onValid)}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            {...register("name", { required: "Write your name please." })}
          />
          <span>{errors?.name?.message}</span>
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            {...register("email", { required: "Write your email please." })}
          />
          <span>{errors?.email?.message}</span>
        </div>
        <button>Create Account</button>
      </form>
    </div>
  );
}
