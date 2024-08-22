export interface Posts {
  id: number;
  title: string
  body: string
  tags:string[]
  reactions: reaction;
  views: number[];
  user: string;
  useremail: string;
  image:string
  created:Date
}

export interface reaction {
    likes: number[];
}