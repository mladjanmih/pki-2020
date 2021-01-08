import { Geolocation } from "./geolocation.model";

export class Place {
  name: string;
  summary: string;
  description: string;
  imageUrl: string;
  geolocation: Geolocation;
  category: string;
  likes: number;
  address: string;
  images: string[];
}
