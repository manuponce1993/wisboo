export interface User {
   id: string,
   bio: string,
   first_name: string,
   instagram_username: string,
   last_name: string,
   location: string,
   name: string,
   portfolio_url: string,
   profile_image: {
      large: string,
      medium: string,
      small: string,
   }
   total_collections: number,
   total_likes: number,
   total_photos: number,
   twitter_username: string,
   updated_at: Date
   username: string
}
