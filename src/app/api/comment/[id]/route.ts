import prisma from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export const  GET = async ( req: Request ) => {
  const id: number = parseInt(req.url.split("/comment/")[1]);
  try {
    const comments = await prisma.comment.findMany({
      where: { db_id: id },
      // commentsにauthor(Userテーブルとの接続口)を含める(Userテーブルの情報を取得)
      include: { author: true }
    });
    return NextResponse.json({ message: "Success", comments }, { status: 200 });
  } catch( error ) {
    return NextResponse.json({ message: "failed", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};