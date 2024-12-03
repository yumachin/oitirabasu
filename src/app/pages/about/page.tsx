'use client';

import Header from '@/components/Header';
import { aboutDetails } from '@/utils/datas';

import { useRouter } from 'next/navigation';

// npx shadcn@latest init
// npx shadcn@latest button
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
// npm i lucide-react 
import { ChevronRight } from 'lucide-react';
// アニメーションを追加するライブラリ
// npm i framer-motion
import { motion } from 'framer-motion';

export default function About() {
  const animation = {
    // アニメーションの初期状態を定義。要素の不透明度を0（透明）にし、垂直方向に30ピクセル下に配置
    initial: { opacity: 0, y: 30 },
    // アニメーションの最終状態を定義。不透明度を1にし、y位置を0（元の位置）に戻す
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };
  const router = useRouter();
  
  return (
    <div className='min-h-screen'>
      <Header />
      <div className="pt-20 sm:pt-28 px-4">
        <motion.div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.h1 
              className="text-4xl font-bold text-gray-800 sm:text-6xl mb-6"
              {...animation}
            >
              About
            </motion.h1>
            <motion.p 
              className="mt-3 sm:mt-12 max-w-md sm:max-w-3xl mx-auto text-gray-600 sm:text-xl"
              {...animation}
            >
              ここはOITirabasuの概要ページです。
              OITirabasuとは、大学のポータルサイトのシラバスでは知ることができない先生の評判や、
              授業の進行方法、テストの難易度などなどたくさんの有益な情報を手に入れることができる
              特設掲示板です！この掲示板を使って、短い大学生活を有意義に過ごしましょう!
              以下の3点をよく理解してご利用ください。
            </motion.p>
          </div>
          <div>
            <motion.div 
              className="grid gap-10 sm:grid-cols-3"
              // staggerChildren: 子要素が順番にアニメーションを実行する際の遅延時間を設定
              variants={{animate: { transition: { staggerChildren: 0.15 } }}}
              // "initial": const animationで定義したもの
              initial="initial"
              animate="animate"
            >
              {aboutDetails.map((item, index) => (
                <motion.div key={index} variants={animation}>
                  <Card className="h-full hover:shadow-xl transition duration-300">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <item.icon className="h-12 w-12 text-slate-400" />
                      <h2 className="text-2xl font-bold text-gray-900 mb-5">{item.title}</h2>
                      {item.title === "Attention" ? (
                        <p className='text-red-500 font-black'>落単には一切の責任を負いません。</p>
                      ) : (
                        <p></p>
                      )}
                      <p className="text-gray-600">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <motion.div className="mt-16 sm:mt-24 mb-6 text-center" {...animation}>
            <Button 
              className="items-center px-10 py-6 rounded-md text-white bg-slate-700 hover:bg-slate-800"
              onClick={() => router.push("/pages/signUp")}
            >
              新規アカウント登録
              <ChevronRight className="ml-1 -mr-4" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};