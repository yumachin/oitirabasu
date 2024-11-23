"use client"

import Header from '@/components/layouts/header/Header';
import { useSignOut } from '@/hooks/auth/useSignOut';
import { useUser } from '@/hooks/user/useUser';
import { supabase } from '@/utils/supabase';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogOut } from 'lucide-react';

const SignOut = () => {
  const signOut = useSignOut();
  const { session } = useUser();
  const router = useRouter();

  const [name, setName] = useState<string>("");
  // user: Userテーブル
  const email = session?.user.email;

  useEffect(() => {
    const getEmail = async () => {
      // 取得したemailとUserテーブルのemailが一致する行のnameを取得
      const { data } = await supabase.from('User').select('name').eq('email', email); 
      // data = [{name: 'ゆうま'}]
      // console.log("dataは", data)

      // data/sessionがnullの可能性があるため
      if ( data && session ) {
        setName(data[0].name);
      }
    }
    getEmail();
  }, [session]);

  // ニックネームを更新する関数
  const sendName = async ( name: string | undefined ) => {
    // supabase.auth.getSession(): Supabaseが管理するsessionを取得
    const { data: { session } } = await supabase.auth.getSession();
    const res = await fetch("/api/set", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access_token}`
      },
      // PUTする値を指定(nameで上書きする)
      body: JSON.stringify({ name })
    })
    return await res.json();
  }

  const saveName = async () => {
    const result = await sendName(name);
    result.message === 'Success' && router.push("/");
  };

  const handleLogOut = async () => {
    await signOut();
    router.push("/");
  };
  
  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-white">
          <CardHeader className="space-y-1">
            <div className="flex items-center space-x-4">
              <CardTitle className="text-2xl font-bold text-slate-800">
                設定
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
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
              <LogOut className="w-4 h-4 mr-2" />
              SignOut
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default SignOut;