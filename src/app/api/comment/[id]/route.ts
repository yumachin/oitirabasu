import prisma from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export const  GET = async ( req: Request ) => {
  try {
    // http://localhost:3000/api/comment/[id]
    const id: number = parseInt(req.url.split("/comment/")[1]);
    const comments = await prisma.comment.findMany({
      where: { db_id: id },
      // commentsにauthor(Userテーブルとの接続口)を含める(Userテーブルの情報を取得)
      include: { author: true },
      // 並び方を降順に変更
      orderBy: { id: "desc" }
    });
    return NextResponse.json({ message: "Success", comments }, { status: 200 });
  } catch( error ) {
    return NextResponse.json({ message: "Failed", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async ( req: Request ) => {
  try {
    const { stars, title, content, id, authorId } = await req.json();
    const post = await prisma.comment.create({ data: { stars, title, content, db_id: parseInt(id), authorId } });
    return NextResponse.json({ message: 'Success', post }, { status: 201 });
  } catch ( error ) {
    return NextResponse.json({ message: 'Failed', error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};