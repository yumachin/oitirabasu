import prisma from "@/lib/prismaClient";
import { supabase } from "@/lib/supabaseClient";

import { NextResponse } from "next/server";

export const PUT = async (req: Request) => {
  try {
    // Authorization: signOutページの50行目
    const authHeader = req.headers.get("Authorization");
    // accessToken: signOutページの50行目からBearerを除いた部分
    const accessToken = authHeader?.split(" ")[1];

    // supabase.auth.getUser: ユーザー情報を取得し、そのユーザー情報のuserプロパティを分割代入で直接取得
    const { data: { user } } = await supabase.auth.getUser(accessToken);
    const email = user?.email;

    // signOutページの53行目からnameプロパティを分割代入で直接取得
    const { name } = await req.json();
    const newName = await prisma.user.update({ where: { email }, data: { name } });
    return NextResponse.json({ message: "Success", newName }, { status: 200 });
  } catch ( error ) {
    return NextResponse.json({ message: "failed", error }, { status: 500 });
  }
};