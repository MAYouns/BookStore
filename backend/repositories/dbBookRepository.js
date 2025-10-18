const BooksModel = require('../models/bookModel');


const createBook = async (body) => {
    return await BooksModel.create(body);
}

const getAllBooks = async () => {
    return await BooksModel.find();
}

const filterByTitleOfDisc = async (text) => {
    const result = await BooksModel.find({ $or: [{ title: { $regex: new RegExp(text, 'i') } }, { description: { $regex: new RegExp(text, 'i') } }] });
    return result;
}

const sortByPrice = async (number) => {
    return await BooksModel.find().sort({ price: number });
}

const filterAndSort = async (text) => {
    return await BooksModel.find({ $or: [{ title: { $regex: new RegExp(text, 'i') } }, { description: { $regex: new RegExp(text, 'i') } }] }).sort({ price: 1 });
}

const getBookById = async (id) => {
    return await BooksModel.findById(id);
}

const updateBook = async (id, update) => {
    return await BooksModel.findByIdAndUpdate(id, update, { new: true });
}

const deleteBook = async (id) => {
    return await BooksModel.findByIdAndDelete(id); // will return null if the document not found
}


module.exports = {
    createBook,
    getAllBooks,
    filterByTitleOfDisc,
    sortByPrice,
    filterAndSort,
    getBookById,
    updateBook,
    deleteBook
}