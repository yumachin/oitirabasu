"use client";

import Header from "@/components/Header";
import useUser from "@/hooks/useUser";
import { CommentPost } from "@/types/types";
import { commentSchema } from "@/utils/validation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ReactNode, use, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { MdStar } from "react-icons/md";

const postComment = async ( stars: number, title: string,  content: string, id: number, authorId: number | undefined ) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${API_URL}/api/comment/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ stars, title, content, id, authorId })
  });
  return await res.json();
};

export default function Comment({ params }: { params: Promise<{ id : number }> }) {
  const stars = [1, 2, 3, 4, 5];
  const [count, setCount] = useState<number>(0);
  const router = useRouter();
  const { id } = use(params);
  const { user } = useUser();
  const authorId = user?.id;
  const [subjectName, setSubjectName] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const getSubjectName = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${API_URL}/api/subject/${id}`, {
      cache: "no-store"
    });
    const data = await res.json();
    return data.subject.name;
  };

  const { register, setValue, handleSubmit, formState: { errors } } = useForm<CommentPost>({
    defaultValues: { stars: 0, title: "", content: "" },
    mode: "onChange",
    resolver: zodResolver(commentSchema)
  });

  const handlePost: SubmitHandler<CommentPost> = async ( formData ) => {
    toast.loading("Loading...", {id: '1'});
    toast.success("Success!", {id: '1'});
    await postComment( formData.stars, formData.title, formData.content, id, authorId );
    router.push("/");
    router.refresh();
  };

  useEffect(() => {
    const fetchSubjectName = async () => {
      const tepSubjectName = await getSubjectName();
      setSubjectName(tepSubjectName);
    };
    fetchSubjectName();
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          {/* animate-spin: 回転アニメーション適用 */}
          {/* border-t-transparent: 円を上部を欠けさせる */}
          <div className="h-24 w-24 border-4 border-indigo-400 rounded-full animate-spin border-t-transparent"></div>
        </div>
      ) : (
        <></>
      )}
      <Toaster />
      <Header />
      <div className="flex justify-center items-center flex-col h-screen">
        <Card className="w-full max-w-md bg-white">
          <CardHeader className="space-y-1 mb-4">
            <CardTitle className="text-2xl font-bold text-center text-slate-800 mb-2">{subjectName}</CardTitle>
            <CardDescription className="text-center text-slate-600">コメントを入力してください</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(handlePost)}>
            <CardContent className="space-y-8 mb-6">
              {/* 星での評価 */}
              <div className="flex flex-col justify-center space-x-2 space-y-2">
                <Label>評価</Label>
                <div className="flex">
                  {stars.map(( star ) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => {
                        const newCount = count === star ? star - 1 : star;
                        setCount(newCount);
                        setValue("stars", newCount);
                      }}
                      className="focus:outline-none"
                    >
                      <MdStar className={`w-8 h-8 ${ star <= count ? "text-yellow-400" : "text-gray-300" }`} />
                    </button>
                  ))}
                </div>
                <input
                  type="hidden"
                  {...register("stars")}
                />
              </div>
              {/* 星での評価 */}
              {/* タイトル */}
              <div className="space-y-2">
                <Label htmlFor="title">タイトル</Label>
                <Input 
                  id="title"
                  {...register("title")}
                  className="transition duration-200 ease-in-out focus:ring-2 focus:ring-slate-500"
                />
                {/* as ReactNode: errors.title?.messageがundefinedの時用 */}
                <p className="text-red-500 text-xs mt-1 ml-1">{errors.title?.message as ReactNode}</p>
              </div>
              {/* タイトル */}
              {/* 詳細内容 */}
              <div className="space-y-2">
                <Label htmlFor="content">詳細内容</Label>
                <Textarea 
                  id="content"
                  rows={5}
                  {...register("content")}
                  className="pr-10 transition duration-200 ease-in-out focus:ring-2 focus:ring-slate-500"
                />
                {/* as ReactNode: errors.content?.messageがundefinedの時用 */}
                <p className="text-red-500 text-xs mt-1 ml-1">{errors.content?.message as ReactNode}</p>
              </div>
              {/* 詳細内容 */}
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-slate-700 hover:bg-slate-800 text-white transition duration-200 ease-in-out">
                投稿
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
};