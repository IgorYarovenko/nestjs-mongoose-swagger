import { Document } from 'mongoose';

export interface Book extends Document {
  title: string;
  author: string;
  pages: number;
  overview: string;
  url: string;
}
