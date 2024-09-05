export interface Posts {
  id: string;
  title: string
  body: string
  tags:string[]
  reactions: reaction;
  views: number[];
  user: string;
  useremail: string;
  image:string
  created:number
}

export interface reaction {
    likes: string;
}