import * as mongoose from 'mongoose';

export const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  pages: {
    type: Number,
    required: true,
  },
  overview: {
    type: String,
    required: true,
    minlength: 250,
    maxlength: 1000,
  },
  url: {
    type: String,
    required: true,
  },
});
