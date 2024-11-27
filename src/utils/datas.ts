// npm i lucide-react
import { Handshake, TriangleAlert, Mail } from 'lucide-react';

export const aboutDetails = [
  { icon: Handshake, title: "By Everyone", description: "OITirabasuは在校生みんなで作り上げていくものです。新入生のためにアカウントを登録をして、積極的に授業の書き込みを行いましょう。" },
  { icon: TriangleAlert, title: "Attention", description: "コメントの中には、でたらめを書いたものがあるかもしれません。コメントを信用しすぎないように気を付けましょう。" },
  { icon: Mail, title: "Contact", description: "不具合報告フォームは作成中です。もし不具合など発見されましたら、恐れ入りますが0120-654-321にお問い合わせください。" }
];

export const subjects = [
  {
    id: 1,
    name: "線形代数学Ⅰ",
    teacher: "塚本",
    span: "Semester",
    type: "2"
  },
  {
    id: 2,  
    name: "線形代数学Ⅰ",
    teacher: "東海林",
    span: "Semester",
    type: "2"
  },
  {
    id: 3,
    name: "物理学Ⅰ", 
    teacher: "林(正人)",
    span: "Quarter",
    type: "2"
  },
  {
    id: 4,
    name: "物理学Ⅰ", 
    teacher: "門内",
    span: "Quarter",
    type: "2"
  },
  {
    id: 5,
    name: "文章表現基礎Ⅰ",
    teacher: "米田",
    span: "Semester",
    type: "1"
  },
  {
    id: 6,
    name: "造形演習",
    teacher: "福原/松井/吉川/姜/脇田/・・・",
    span: "Semester",
    type: "3"
  },
  {
    id: 7,
    name: "工学倫理",
    teacher: "吉川/大須賀/今井/福原/郡",
    span: "Quarter",
    type: "2"
  },
  {
    id: 8,
    name: "基礎情報処理",
    teacher: "井上（明）, 西田",
    span: "Semester",
    type: "3"
  },
  {
    id: 9,
    name: "キャリアデザイン",
    teacher: "小林/倉前/白髪/井上(猛)",
    span: "Semester",
    type: "2"
  },
  {
    id: 10,
    name: "計測工学",
    teacher: "大須賀",
    span: "Quarter",
    type: "3",
    require
  },
  {
    id: 11,
    name: "基礎ゼミナール",
    teacher: "小林/井上(明)/大須賀/脇田/井上(剛)中山/瀬尾/・・・",
    span: "Semester",
    type: "2",
    require
  },
  {
    id: 12,
    name: "解析学Ⅰ",
    teacher: "東海林",
    span: "Semester",
    type: "2"
  },
  {
    id: 13,
    name: "プラクティカル・イングリッシュa",
    teacher: "横山(香)",
    span: "Semester",
    type: "1"
  },
  {
    id: 14,
    name: "プラクティカル・イングリッシュa",
    teacher: "渡辺",
    span: "Semester",
    type: "1"
  },
  {
    id: 15,
    name: "プラクティカル・イングリッシュa",
    teacher: "村尾",
    span: "Semester",
    type: "1"
  },
  {
    id: 16,
    name: "プログラミング演習Ⅰ",
    teacher: "小林/瀬尾",
    span: "Semester",
    type: "3"
  },
  {
    id: 17,
    name: "健康体育Ⅰ",
    teacher: "石道/西脇/小田(啓)/木内/橘",
    span: "Semester", 
    type: "1",
    other: "大宮キャンパスで開講"
  },
  {
    id: 18,
    name: "ものづくりデザイン演習",
    teacher: "横山(広)/岩田/竹村/加藤/近藤/辻田/川浦/横川",
    span: "Semester",
    type: "3",
    require,
    other: "大宮キャンパスで開講"
  },
  {
    id: 19,
    name: "現代デザイン史",
    teacher: "横山（広）",
    type: "2",
    span: "Quarter"
  },
]