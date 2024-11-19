"use client"

import Header from '@/components/layouts/header/Header';
import { useSignOut } from '@/hooks/auth/useSignOut';
import { useUser } from '@/hooks/user/useUser';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogOut } from 'lucide-react';

const SignOut = () => {
  const signOut = useSignOut();
  const { session } = useUser();
  const router = useRouter();

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
                User Settings
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name"
                type='text'
                defaultValue={session?.user.user_metadata.name}
                className="transition duration-200 ease-in-out focus:ring-2 focus:ring-slate-500" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                defaultValue={session?.user.email}
                className="transition duration-200 ease-in-out focus:ring-2 focus:ring-slate-500" 
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button className="bg-slate-700 hover:bg-slate-800 text-white transition duration-200 ease-in-out">
              Save Changes
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