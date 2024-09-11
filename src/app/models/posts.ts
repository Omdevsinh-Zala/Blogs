export interface Posts {
  id: string;
  title: string
  body: string
  tags:string[]
  reactions: reaction;
  views: number[];
  user: string;
  userId:string
  useremail: string;
  image:string
  created:number,
  titleForRouter: string
}

export interface reaction {
    likes: string;
}