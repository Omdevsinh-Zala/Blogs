import { SocilaLinks } from "./users";

export interface UpdateUser {
    firstName: string;
  lastName: string;
  location: string;
  bio: string;
  skills: string;
  work: string;
  workEmail: string;
  socialLinks: SocilaLinks[]
  learning:string,
  language:string
  image?:string
} 