const express = require('express');
const booksRouter = require('./Routes/books');

const app = express();

app.use(express.json()); //middleware que faz o parse do body das requisições
app.use('/books', booksRouter); 

//rota não encontrada
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

module.exports = app;