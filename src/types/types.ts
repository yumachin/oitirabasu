// schema.prismaで定義した通り
export interface UserType {
  id:      number;
  auth_id: string;
  email:   string;
  name:    string;
  posts:   PostType[];
};

export interface PostType {
  id:        number;
  createdAt: Date;
  updatedAt: Date;
  stars:     number;
  title:     string;
  content:   string;
  author?:   UserType;
  authorId?: number;
};


export interface SignProps {
  name?:    string;
  email:    string;
  password: string;
};