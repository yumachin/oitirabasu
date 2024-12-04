import prisma from "@/lib/prismaClient";

import { NextResponse } from "next/server";

export const GET = async ( req: Request ) => {
  try {
    const type = parseInt(req.url.split("/LpSubject/")[1]);
    const subjects = await prisma.subject.findMany({
      where: {type: type},
      orderBy: {
        // id昇順に取得
        id: 'asc'
      }
    });
    return NextResponse.json({ message: "Success", subjects }, { status: 200 });
  } catch( error ) {
    return NextResponse.json({ message: "Failed", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};