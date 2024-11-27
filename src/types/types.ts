// schema.prismaで定義した通り
export interface User {
  id:      number;
  auth_id: string;
  email:   string;
  name:    string;
  posts:   Comment[];
};

export interface Comment {
  id:        number;
  db_id:     number;
  createdAt: string;
  updatedAt: string | null;
  stars:     number;
  title:     string;
  content:   string;
  author:    User;
  authorId:  number;
};

export interface SignProps {
  name?:    string;
  email:    string;
  password: string;
};