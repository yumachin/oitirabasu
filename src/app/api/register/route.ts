import prisma from "@/lib/prismaClient";

import { NextResponse } from "next/server";

// 講義科目の追加
export const POST = async ( req: Request ) => {
  try {
    const { name, teacher, type, span, evaluate, stars, other, requ } = await req.json();
    const subject = await prisma.subject.create({ data: { name, teacher, type, span, evaluate, stars, other, requ } });
    return NextResponse.json({ message: 'Success', subject }, { status: 201 });
  } catch ( error ) {
    return NextResponse.json({ message: 'Failed', error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};