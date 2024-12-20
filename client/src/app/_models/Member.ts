import { Photo } from "./Photo";

export interface Member {
  id: number;
  username: string;
  age: number;
  photoUrl: string;
  knownAs: string;
  created: Date;
  lastActive: Date;
  gender: string;
  intrduction: any;
  lookingFor: string;
  city: string;
  country: string;
  photos: Photo[];
}
