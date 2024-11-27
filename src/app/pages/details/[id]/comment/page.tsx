"use client";

import Header from "@/components/Header";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { MdStar } from "react-icons/md";

export default function Comment() {
  const stars = [1, 2, 3, 4, 5];
  const [count, setCount] = useState<number>(0);

  return (
    <>
      <Header />
      <div className="flex justify-center items-center flex-col h-screen">
        <Card className="w-full max-w-md bg-white">
          <CardHeader className="space-y-1 mb-4">
            <CardTitle className="text-2xl font-bold text-center text-slate-800 mb-2">Comment</CardTitle>
            <CardDescription className="text-center text-slate-600">コメントを入力してください</CardDescription>
          </CardHeader>

          <CardContent className="space-y-8 mb-6">

            {/* 星での評価 */}
            <div className="flex flex-col justify-center space-x-2 space-y-2">
              <Label>評価</Label>
              <div className="flex">
                {stars.map(( star ) => (
                  <button
                    key={star}
                    onClick={() => setCount(( prev ) => prev === star ? star - 1 : star )}
                    className="focus:outline-none"
                  >
                    <MdStar className={`w-8 h-8 ${ star <= count ? "text-yellow-300" : "text-gray-300" }`} />
                  </button>
                ))}
              </div>
              {/* { count > 0 ? count : 0 } */}
            </div>
            {/* 星での評価 */}

            {/* タイトル */}
            <div className="space-y-2">
              <Label htmlFor="title">タイトル</Label>
              <Input 
                id="title"
                className="transition duration-200 ease-in-out focus:ring-2 focus:ring-slate-500"
              />
              <p className="text-red-500 text-xs mt-1 ml-1"></p>
            </div>
            {/* タイトル */}

            {/* 詳細内容 */}
            <div className="space-y-2">
              <Label htmlFor="password">詳細内容</Label>
              <div className="relative">
                <Input 
                  id="password"
                  className="pr-10 transition duration-200 ease-in-out focus:ring-2 focus:ring-slate-500"
                />
              </div>
              <p className="text-red-500 text-xs mt-1 ml-1"></p>
            </div>
            {/* 詳細内容 */}

          </CardContent>

          <CardFooter>
            <Button className="w-full bg-slate-700 hover:bg-slate-800 text-white transition duration-200 ease-in-out">
              投稿
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};