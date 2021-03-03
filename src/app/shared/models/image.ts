import { User } from './user';

export interface Image {
   id: string,
   isSaved: boolean,
   urls: {
      full: string,
      raw: string,
      regular: string,
      small: string,
      thumb: string,
   },
   user: User,
   likes: number,
   alt_description: string,
   categories: string[],
   color: string,
   created_at: Date
   description: string,
   downloads: number,
   height: number,
   width: number,
   liked_by_user: boolean,
   views: number
}
