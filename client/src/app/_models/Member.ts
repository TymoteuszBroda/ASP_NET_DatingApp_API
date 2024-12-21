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
  introduction: any;
  lookingFor: string;
  interests: string;
  city: string;
  country: string;
  photos: Photo[];
}
