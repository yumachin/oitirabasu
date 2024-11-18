// npm i zod
import { z } from "zod";

// string(): email, passwordが文字列型と期待
// email, passwordはregisterで登録したキー名
export const signInSchema = z.object({
  email: z.string().min(1, "メールアドレスは必須です。").email("正しいメールアドレスで入力してください。"),
  password: z.string().min(1, "パスワードは必須です。").min(6, "パスワードは6文字以上で入力してください。").max(25, "パスワードは25文字以内で入力してください。")
});