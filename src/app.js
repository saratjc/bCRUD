const express = require('express');
const booksRouter = require('./Routes/books');

const app = express();

app.use(express.json()); //middleware que faz o parse do body das requisições
app.use('/books', booksRouter); ////as rotas dentro do booksRouter terão o prefixo /books

//rota não encontrada
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

//middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err); //exibe o erro
  res.status(500).json({ error: 'Erro interno do servidor' });
});

module.exports = app;