import prisma from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export const  GET = async ( req: Request ) => {
  try {
    // http://localhost:3000/api/pastComment/[id]
    const authorId: number = parseInt(req.url.split("/pastComment/")[1]);
    const pastComments = await prisma.comment.findMany({
      where: { authorId: authorId },
      // 並び方を降順に変更
      orderBy: { id: "desc" }
    });
    return NextResponse.json({ message: "Success", pastComments }, { status: 200 });
  } catch( error ) {
    return NextResponse.json({ message: "Failed", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};