"use client";

import useSignIn from "@/hooks/auth/useSignIn";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

import { signInSchema } from "@/utils/signValidation/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import Header from "@/components/layouts/header/Header";

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: ""
    },
    mode: 'onChange',
    resolver: zodResolver(signInSchema)
  });

  const { signIn } = useSignIn( setError )
  const router = useRouter()

  const handleLogin: SubmitHandler<LoginForm> = async ( formData ) => {
    const signin = await signIn({ email: formData.email, password: formData.password })
    // エラーが吐かれなかった時だけルートディレクトリに移動
    if (signin && signin.error === null) {
      router.push("/"); // 成功時にホーム画面へ遷移
    }
    console.log("emailは", errors.email?.message)
    console.log("passwordは", errors.password?.message)
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center flex-col h-screen">
        <h1 className="mb-8 text-4xl">ログイン画面</h1>
        <form onSubmit={handleSubmit(handleLogin)} className="w-full max-w-md">
          <div className="mb-6">
            <input
              type="email"
              placeholder="メールアドレス"
              {...register("email")}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
            />
            <p className="text-red-500 text-sm mt-1 ml-1">{errors.email?.message as ReactNode}</p>
          </div>

          <div className="mb-4">
            <input
              type="password"
              placeholder="パスワード"
              {...register("password")}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
            />
            <p className="text-red-500 text-sm mt-1 ml-1">{errors.password?.message as ReactNode}</p>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
          >
            ログイン
          </button>
        </form>
        <Link href={"/pages/sign/signUp"}
          className="mt-24 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
        >
          新規アカウント登録画面へ
        </Link>
      </div>
    </>
  );
};

export default Login;