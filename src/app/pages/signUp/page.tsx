"use client";

import Header from "@/components/header/Header";
import { useSignUp } from "@/hooks/useSignUp";
import { SignProps } from "@/types/types";
import { signUpSchema } from "@/utils/validation";

import { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// npm i @hookform/resolvers
import { zodResolver } from "@hookform/resolvers/zod";

// reactのversionが19.00の場合react-hook-formをインストールできないので、npm i react@18.2.0 react-dom@18.2.0でダウングレード
// npm i react-hook-form
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    // 初期値を指定(下で定義したhandleRegisterには引数が必要　=> name, email, passwordプロパティをstring型で指定しているに初期値がないとnullになってしまう)
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
  const [showPassword, setShowPassword] = useState(false);

  // SubmitHandler: 型定義
  // formData: フォームから送られてきたオブジェクト
  const handleSignUp: SubmitHandler<SignProps> = async ( formData ) => {
    console.log("formData.name", formData.name);
    console.log("formData.email", formData.email);
    console.log("formData.password", formData.password);
    await signUp({ name: formData.name, email: formData.email, password: formData.password });
    router.push("/");
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center flex-col h-screen">
        <Card className="w-full max-w-md bg-white">
          <CardHeader className="space-y-1 mb-4">
            <CardTitle className="text-2xl font-bold text-center text-slate-800 mb-2">SignUp</CardTitle>
            <CardDescription className="text-center text-slate-600">ニックネーム、メールアドレス、パスワードを登録してください</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(handleSignUp)}>
            <CardContent className="space-y-3 mb-6">
              <div className="space-y-2">
                <Label htmlFor="name">ニックネーム</Label>
                <Input 
                  id="name" 
                  placeholder="山田　太郎" 
                  type="text" 
                  {...register("name")}
                  className="transition duration-200 ease-in-out focus:ring-2 focus:ring-slate-500"
                />
                <p className="text-red-500 text-xs mt-1 ml-1">{errors.name?.message as ReactNode}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input 
                  id="email"
                  placeholder="m@example.com"
                  type="email"
                  {...register("email")}
                  className="transition duration-200 ease-in-out focus:ring-2 focus:ring-slate-500"
                />
                <p className="text-red-500 text-xs mt-1 ml-1">{errors.email?.message as ReactNode}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">パスワード</Label>
                <div className="relative">
                  <Input 
                    id="password"
                    placeholder="password"
                    type={showPassword ? "text" : "password"} 
                    {...register("password")} 
                    className="pr-10 transition duration-200 ease-in-out focus:ring-2 focus:ring-slate-500"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)} 
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <p className="text-red-500 text-xs mt-1 ml-1">{errors.password?.message as ReactNode}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-slate-700 hover:bg-slate-800 text-white transition duration-200 ease-in-out">
                SignUp
              </Button>
            </CardFooter>
          </form>
          <CardFooter className="flex flex-col items-center">
            <Link href={"/pages/sign/signIn"} className="text-sm text-center text-slate-500 hover:text-slate-700">登録済みの方はこちら</Link>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};