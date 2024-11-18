import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export const main = async () => {
  try {
    await prisma.$connect();
  } catch ( err ) {
    return Error("DB接続に失敗しました");
  }
};

export const GET = async (req: Request, res: NextResponse) => {
  try {
    await main();
    // このidは、api/user/[id]のidを指している
    const id = req.url.split("user/")[1];
    // prisma.userはschema.prismaで定義したUserのこと
    // findUnique: 特定の1つのレコードを一意な条件で検索
    const user = await prisma.user.findUnique({
      // schema.prismaで定義したUserモデルのauth_idに、idの値を指定して検索
      where: { auth_id: id },
      // include: リレーションを設定したテーブル同士のデータ(Userテーブルのposts: PostテーブルのPost[]としてるから)を、まとめて取得
      include: {
        // posts: Userモデルの中のpostsのこと
        // true: postsも取得
        posts: true,
      },
    });
    return NextResponse.json({ message: "Success", user }, { status: 200 });
  } catch ( error ) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
