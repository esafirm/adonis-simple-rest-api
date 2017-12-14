'use strict';

const Book = use('App/Models/Book');
const _ = require('lodash');

class BookController {
  
  async index({ response }) {
    const books = await Book.all();
    return response.json(books);
  }

  async store({ request, response }) {
    const bookInfo = request.only(['title', 'year']);

    console.log('bookInfo', bookInfo);

    if (_.isEmpty(bookInfo)) {
      return response.status(400).json({
        message: 'parameter not specified'
      });
    }

    const book = new Book();
    book.title = bookInfo.title;
    book.year = bookInfo.year;

    await book.save();

    return response.status(201).json(book);
  }

  async show({ params, response }) {
    const book = await Book.find(params.id);
    return response.json(book);
  }

  async update({ request, params, response }) {
    const bookInfo = request.only(['title', 'year']);
    const book = await Book.find(params.id);

    if (_.isEmpty(book)) {
      return response.status(400).json({ message: 'book not found' });
    }

    book.title = bookInfo.title;
    book.year = bookInfo.year;

    await book.save();

    return response.status(200).json(book);
  }

  async delete({ params, response }) {
    const book = await Book.find(params.id);
    if (_.isEmpty(book)) {
      return response.status(400).json({ message: 'parameter not specified' });
    }

    await book.delete();

    return response.status(204).json({ message: 'book deleted' });
  }
}

module.exports = BookController;
