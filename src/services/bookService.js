const crypto = require('crypto');
const {readBooks, writeBooks} = require("../Repositories/bookRepository")
//lista todos os livros
async function listBooks(category) {
  const books = await readBooks();
  
  //se nenhuma categoria foi informada retorna todos os livros de uma vez
  if (!category) return books;
  
  //caso uma categoria exista filtra a lista
  return books.filter(
    (book) => book.category.toLowerCase() === String(category).toLowerCase()
  );
}

//busca pelo id
async function getBookById(id) {
  const books = await readBooks();
  
  //procura o o primeiro livro que possui o id correspondente
  return books.find((book) => book.id === id) || null;
}

//registra um livro novo
async function createBook(bookData) {
  const books = await readBooks();
  
  const newBook = {
    id: crypto.randomUUID(), //gera um ID único
    ...bookData,            //copia propriedades como titulo e autor
  };
  
  //adiciona o novo livro no final da lista
  books.push(newBook);
  
  await writeBooks(books);
  
  return newBook;
}

//modifica os dados de um livro existente
async function updateBook(id, updates) {
  const books = await readBooks();
  
  //localiza o indice do array 
  const index = books.findIndex((book) => book.id === id);
  
  if (index === -1) return null;

  //cria um novo objeto unindo as propriedades do livro antigo com as novas alterações
  const updatedBook = { ...books[index], ...updates };
  
  //substitui o livro antigo pelo novo
  books[index] = updatedBook;
  
  await writeBooks(books);
  
  return updatedBook;
}

//exclui um livro
async function deleteBook(id) {
  const books = await readBooks();
  
  const index = books.findIndex((book) => book.id === id);
  
  if (index === -1) return false;

  books.splice(index, 1);
  
  //reescreve o arquivo/banco sem o livro deletado
  await writeBooks(books);
  
  return true;
}

module.exports = {
  listBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
