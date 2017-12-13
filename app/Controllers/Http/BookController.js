'use strict';

const Book = use('App/Models/Book');
const _ = require('lodash')

class BookController {
  async index({ response }) {
    const books = Book.all();
    return response.json(books);
  }

  async create() {}

  async store({ request, response }) {
    const bookInfo = request.only(['title', 'year']);

    console.log('bookInfo', bookInfo)

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

  async show() {}

  async edit() {}

  async update() {}

  async delete() {}
}

module.exports = BookController;
