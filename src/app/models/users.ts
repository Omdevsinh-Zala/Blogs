export interface Users {
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  bio: string;
  accountCreated: number;
  uniqueName:string,
  password: string;
  id: number;
  image: string;
  skills: string;
  work: string;
  workEmail: string;
  socialLinks: SocilaLinks[]
  learning:string,
  language:string[]
}

export interface SocilaLinks {
    gitHub:string,
    facbook: string,
    instagram: string,
    twitter: string
  }
