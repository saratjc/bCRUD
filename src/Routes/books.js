const express = require('express');
const bookService = require('../services/bookService');
const { createBookSchema, updateBookSchema } = require('../schemas/bookSchema');
const router = express.Router();

//GET /books Lista todos os livros ou filtra por categoria 
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    
    const books = await bookService.listBooks(category);
    
    //retorna a lista de livros com status 200
    res.status(200).json(books);
  } catch (err) {
    console.error(err);
    //retorna status 500 caso algo de errado
    res.status(500).json({ error: 'Erro interno ao listar livros' });
  }
});

//GET /books/:id busca um livro pelo id
router.get('/:id', async (req, res) => {
  try {
    const book = await bookService.getBookById(req.params.id);
    
    //se não encontrar o livro retorna status 404
    if (!book) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }
    
    //se encontrar retorna o livro com status 200
    res.status(200).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno ao buscar livro' });
  }
});

//POST /books cadastra um novo livro
router.post('/', async (req, res) => {
  try {
    //valida os dados recebidos no req.body
    const result = createBookSchema.safeParse(req.body);
    
    //se a validação falhar entra nesse bloco
    if (!result.success) {
      //retorna status 400 
      return res.status(400).json({
        error: 'Dados inválidos',
        details: result.error.flatten().fieldErrors,
      });
    }
    
    const newBook = await bookService.createBook(result.data);
    
    //retorna o livro criado com status 201 
    res.status(201).json(newBook);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno ao cadastrar livro' });
  }
});

//PUT /books/:id atualiza as informações de um livro existente
router.put('/:id', async (req, res) => {
  try {
    //valida as alterações recebidas no req.body
    const result = updateBookSchema.safeParse(req.body);
    
    //se houver campos invalidos ou tipos incorretos barra a requisição
    if (!result.success) {
      return res.status(400).json({
        error: 'Dados inválidos',
        details: result.error.flatten().fieldErrors,
      });
    }
    
    //junta o id do livro e os dados validados para atualização
    const updatedBook = await bookService.updateBook(req.params.id, result.data);
    
    //se o id fornecido não corresponder a nenhum livro retorna 404
    if (!updatedBook) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }
    
    //se atualizado com sucesso retorna o objeto modificado com status 200 
    res.status(200).json(updatedBook);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno ao atualizar livro' });
  }
});

//DELETE /books/:id remove um livro da base de dados pelo id
router.delete('/:id', async (req, res) => {
  try {
    //executa a remoção do livro através do id 
    const deleted = await bookService.deleteBook(req.params.id);
    
    //se o livro não existia para ser deletado retorna status 404
    if (!deleted) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }
    
    //se deletado com sucesso retorna status 204 indicando sucesso sem corpo de resposta
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno ao remover livro' });
  }
});

module.exports = router;
