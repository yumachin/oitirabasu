import prisma from "@/lib/prismaClient";
import { supabase } from "@/utils/supabase";

import { NextResponse } from "next/server";

export const PUT = async (req: Request) => {
  try {
    const authHeader = req.headers.get("Authorization");
    const accessToken = authHeader?.split(" ")[1];

    if (!accessToken) {
      return NextResponse.json({ message: "認証トークンが見つかりません。" }, { status: 401 });
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken); // トークンを検証してユーザーを取得

    if (error || !user) {
      return NextResponse.json({ message: "無効なトークンです。" }, { status: 401 });
    }

    const email = user.email;
    if (!email) {
      return NextResponse.json({ message: "メールアドレスが見つかりません。" }, { status: 400 });
    }

    const { name } = await req.json();
    if (!name) {
      return NextResponse.json({ message: "名前が無効です。" }, { status: 400 });
    }

    const newName = await prisma.user.update({
      where: { email },
      data: { name },
    });

    return NextResponse.json({ message: "Success", newName }, { status: 200 });
  } catch (error) {
    console.error("エラー:", error);
    return NextResponse.json({ message: "サーバーエラー", error }, { status: 500 });
  }
};