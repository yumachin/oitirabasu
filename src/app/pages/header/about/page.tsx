'use client';

import Header from '@/components/layouts/header/Header';
import { cards } from '@/utils/header/aboutCards';

import { useRouter } from 'next/navigation';

// npx shadcn@latest init
// npx shadcn@latest add ~
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

// アニメーションを追加するライブラリ
import { motion } from 'framer-motion';

const About = () => {
  const animation = {
    // アニメーションの初期状態を定義。要素の不透明度を0（透明）にし、垂直方向に30ピクセル下に配置
    initial: { opacity: 0, y: 30 },
    // アニメーションの最終状態を定義。不透明度を1にし、y位置を0（元の位置）に戻す
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };
  const router = useRouter();
  
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-200 py-6 sm:pt-28 px-4">
        <motion.div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-12">
            <motion.h1 
              className="text-4xl font-bold text-gray-800 sm:text-6xl"
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
              variants={{
                animate: { transition: { staggerChildren: 0.15 } }
              }}
              initial="initial"
              animate="animate"
            >
              {cards.map((item, index) => (
                <motion.div key={index} variants={animation}>
                  <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <item.icon className="h-12 w-12 text-indigo-500" />
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
          <motion.div className="mt-16 sm:mt-24 mb-12 text-center" {...animation}>
            <Button 
              className="items-center px-10 py-6 text-base rounded-md text-white bg-indigo-600 hover:bg-indigo-500"
              onClick={() => router.push("/pages/sign/signUp")}
            >
              新規登録
              <ChevronRight className="ml-1 -mr-4" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default About;