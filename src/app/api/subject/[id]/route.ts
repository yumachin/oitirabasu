import prisma from "@/lib/prismaClient";

import { NextResponse } from "next/server";

// コメント投稿欄に講義名を記載する
export const GET = async ( req: Request ) => {
  try {
    const db_id = parseInt(req.url.split("/subject/")[1]);
    const subject = await prisma.subject.findUnique({where: { id: db_id }});
    return NextResponse.json({ message: "Success", subject }, { status: 200 });
  } catch ( error ) {
    return NextResponse.json({ message: "Failed", error }, { status: 500 });
  }
};