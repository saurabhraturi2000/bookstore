export interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  price: number;
  createdAt?: string;
  updatedAt?: string;
}