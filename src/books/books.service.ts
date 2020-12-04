import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './interfaces/book.interface';

@Injectable()
export class BooksService {
  constructor(@InjectModel('Book') private readonly bookModel: Model<Book>) {}

  async create(createBookDto: CreateBookDto, url: string): Promise<Book> {
    const createBook = new this.bookModel(createBookDto);
    createBook.url = url;
    return createBook.save();
  }

  async find(limit = 20, start = 0): Promise<Book[]> {
    return this.bookModel.find().skip(start).limit(limit);
  }
}
