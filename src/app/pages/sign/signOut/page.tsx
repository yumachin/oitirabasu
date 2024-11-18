"use client"

import useSignOut from '@/hooks/auth/useSignOut';
import { useRouter } from 'next/navigation';
import React from 'react'

const page = () => {
  const signOut = useSignOut();
  const router = useRouter();

  const handleOut = async () => {
    await signOut()
    router.push("/");
  }

  return (
    <div className='flex justify-center items-center' onClick={handleOut}>
      <button className='text-white border p-3 rounded-lg bg-slate-500 mt-64'>
        ログアウト
      </button>
    </div>
  )
}

export default page