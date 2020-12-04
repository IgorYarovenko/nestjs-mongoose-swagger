import {
  Get,
  Post,
  Body,
  Query,
  Controller,
  ParseIntPipe,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { BooksService } from './books.service';
import { ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';
import { ApiImplicitFile } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  @ApiQuery({ name: 'limit', example: 20 })
  @ApiQuery({ name: 'start', example: 0 })
  find(
    @Query('limit', ParseIntPipe) limit = 20,
    @Query('start', ParseIntPipe) start = 0,
  ) {
    return this.booksService.find(limit, start);
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({ name: 'book', required: true, description: 'PDF file' })
  @UseInterceptors(
    FileInterceptor('book', {
      storage: diskStorage({
        destination(req, file, cb) {
          cb(null, './public/books');
        },
        filename(req, file, cb) {
          cb(null, uuidv4() + file.originalname.replace(/\s+/g, ''));
        },
        fileFilter(req, file, cb) {
          cb(null, file.mimetype !== 'application/pdf');
        },
      }),
    }),
  )
  create(
    @Body() createBookDto: CreateBookDto,
    @UploadedFile() file,
  ) {
    if(!file || file.mimetype !== 'application/pdf') {
      return `'Book' file is required and must be in .pdf format`;
    }
    return this.booksService.create(
      createBookDto,
      `${process.env.SERVER_URL}/${file.path}`,
    );
  }
}
