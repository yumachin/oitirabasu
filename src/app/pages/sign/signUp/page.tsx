"use client";

import Header from "@/components/layouts/header/Header";
import useSignUp from "@/hooks/auth/useSignUp";
import { SignProps } from "@/types/types";
import { signUpSchema } from "@/utils/signValidation/signUpSchema";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// npm i @hookform/resolvers
import { zodResolver } from "@hookform/resolvers/zod";

// reactのversionが19.00の場合react-hook-formをインストールできないので、npm i react@18.2.0 react-dom@18.2.0でダウングレード
// npm i react-hook-form
import { SubmitHandler, useForm } from "react-hook-form";

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    // 初期値を指定(下で定義したhandleRegisterには引数が必要　=> email, passwordプロパティをstring型で指定しているに初期値がないとnullになってしまう)
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: 'onChange',
    resolver: zodResolver(signUpSchema)
  });

  const signUp = useSignUp();
  const router = useRouter();

  // SubmitHandler: 型定義
  // formData: フォームから送られてきたオブジェクト
  const handleSignUp: SubmitHandler<SignProps> = async ( formData ) => {
    console.log("formData.name", formData.name);
    console.log("formData.email", formData.email);
    console.log("formData.password", formData.password);
    await signUp({ email: formData.email, password: formData.password });
    router.push("/");
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center flex-col h-screen">
        <h1 className="mb-8 text-4xl">新規アカウント登録画面</h1>
        <form onSubmit={handleSubmit( handleSignUp )} className="w-full max-w-md">
          <div className="mb-6">
            <input 
              type="text" 
              placeholder="名前"
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
              // register("name")により、入力された値がreact-hook-formの内部で name というキー名で管理されるようになる
              {...register("name")}
            />
            <p className="text-red-500 text-sm mt-1 ml-1">{errors.name?.message as ReactNode}</p>
          </div>

          <div className="mb-6">
            <input 
              type="email" 
              placeholder="メールアドレス"
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
              // register("email")により、入力された値がreact-hook-formの内部で email というキー名で管理されるようになる
              {...register("email")}
            />
            <p className="text-red-500 text-sm mt-1 ml-1">{errors.email?.message as ReactNode}</p>
          </div>

          <div className="mb-4">
            <input 
              type="password" 
              placeholder="パスワード"
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
              {...register("password")}
            />
            <p className="text-red-500 text-sm mt-1 ml-1">{errors.password?.message as ReactNode}</p>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
          >
            新規アカウント作成
          </button>
        </form>
        <Link href={"/pages/sign/signIn"}
          className="mt-24 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
        >
          ログイン画面へ
        </Link>
      </div>
    </>
  );
};

export default SignUp;