"use client";

import Header from '@/components/Header';
import useSignOut from '@/hooks/useSignOut';
import useUser from '@/hooks/useUser';
import { supabase } from '@/lib/supabaseClient';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
// npm i react-hot-toast
import toast, { Toaster } from 'react-hot-toast';

// npx shadcn@latest init
// npx shadcn@latest add button
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// npm i lucide-react
import { LogOut } from 'lucide-react';

export default function SignOut() {
  const signOut = useSignOut();
  const { session } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState<string>("");
  // user: Userテーブル
  const email = session?.user.email;

  // ニックネームを取得する関数
  useEffect(() => {
    const getEmail = async () => {
      // 取得したemailとUserテーブルのemailが一致する行のnameを取得
      // data = [{name: 'ゆうま'}]
      const { data } = await supabase.from('User').select('name').eq('email', email); 
      // data/sessionがnullの可能性があるため
      if ( data && session ) {
        setName(data[0].name);
      }
      setLoading(false);
    }
    getEmail();
  }, [email]);

  // ニックネームを更新する関数
  const sendName = async ( name: string | undefined ) => {
    // supabase.auth.getSession(): sessionを取得
    const { data: { session } } = await supabase.auth.getSession();
    const res = await fetch("/api/set", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Authorization: HTTPリクエストに認証情報を渡す
        // Bearer: トークンの認証方式の１つ
        Authorization: `Bearer ${session?.access_token}`
      },
      // PUTする値を指定(nameで更新)
      body: JSON.stringify({ name })
    })
    return await res.json();
  }

  const saveName = async () => {
    toast.loading("Loading...", {id: '1'});
    const result = await sendName(name);
    if ( result.message === 'Success' ) {
      toast.success("Success!", {id: '1'});
      router.push("/");
      router.refresh();
    }
  };

  const handleLogOut = async () => {
    await signOut();
    router.push("/");
  };
  
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
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-xl bg-white space-y-3">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-800">
              設定
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="name">ニックネーム</Label>
              <Input 
                id="name"
                type='text'
                value={name}
                className="transition duration-200 ease-in-out focus:ring-2 focus:ring-slate-500"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              className="bg-slate-700 hover:bg-slate-800 text-white transition duration-200 ease-in-out"
              onClick={saveName}
            >
              保存
            </Button>
            <Button 
              variant="outline" 
              className="text-red-600 hover:bg-red-50 transition duration-200 ease-in-out" 
              onClick={handleLogOut}
            >
              <LogOut className="w-4 h-4 mr-2" />SignOut
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};