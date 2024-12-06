// npm i zod
import { z } from "zod";

// string(): name, email, passwordが文字列型と期待
// name, email, password: registerで登録したキー名
export const signUpSchema = z.object({
  name: z.string().min(1, "ニックネームは必須です。").max(10, "ニックネームは10文字以下で入力してください。"),
  email: z.string().min(1, "メールアドレスは必須です。").email("正しいメールアドレスで入力してください。"),
  password: z.string().min(1, "パスワードは必須です。").min(6, "パスワードは6文字以上で入力してください。").max(25, "パスワードは25文字以内で入力してください。")
});

export const settingsSchema = z.object({
  name: z.string().min(1, "ニックネームは必須です。").max(10, "ニックネームは10文字以下で入力してください。"),
});

export const signInSchema = z.object({
  email: z.string().min(1, "メールアドレスは必須です。").email("正しいメールアドレスで入力してください。"),
  password: z.string().min(1, "パスワードは必須です。").min(6, "パスワードは6文字以上で入力してください。").max(25, "パスワードは25文字以内で入力してください。")
});

export const commentSchema = z.object({
  stars: z.number(),
  title: z.string().min(1, "タイトルは必須です。").max(10, "タイトルは10文字以内で入力してください。"),
  content: z.string().min(1, "詳細内容は必須です。").max(100, "詳細内容は100文字以内で入力してください")
});