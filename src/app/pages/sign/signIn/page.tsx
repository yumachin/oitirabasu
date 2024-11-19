"use client";

import Header from "@/components/layouts/header/Header";
import { useSignIn } from "@/hooks/auth/useSignIn";
import { SignProps } from "@/types/types";
import { signInSchema } from "@/utils/signValidation/signInSchema";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

const SignIn = () => {
  // SignProps: useFormに渡すデータの型
  const { register, handleSubmit, formState: { errors }, setError } = useForm<SignProps>({
    defaultValues: {
      email: "",
      password: ""
    },
    mode: 'onChange',
    resolver: zodResolver(signInSchema)
  });

  const signIn = useSignIn(setError);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  // SignProps: SubmitHandlerがどのようなデータを受け取るかを指定
  const handleLogin: SubmitHandler<SignProps> = async ( formData ) => {
    const signin = await signIn({ email: formData.email, password: formData.password })
    // エラーが吐かれなかった時だけルートディレクトリに移動
    if (signin && signin.error === null) {
      router.push("/"); // 成功時にホーム画面へ遷移
    }
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center flex-col h-screen">
        <Card className="w-full max-w-md bg-white">
          <CardHeader className="space-y-1 mb-4">
            <CardTitle className="text-2xl font-bold text-center text-slate-800 mb-2">SignIn</CardTitle>
            <CardDescription className="text-center text-slate-600">メールアドレスとパスワードを入力してください</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(handleLogin)}>
            <CardContent className="space-y-6 mb-6">
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
                SignIn
              </Button>
            </CardFooter>
          </form>
          <CardFooter className="flex flex-col items-center">
            <Link href={"/pages/sign/signUp"} className="text-sm text-center text-slate-500 hover:text-slate-700">まだ登録をお済みでない方はこちら</Link>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default SignIn;