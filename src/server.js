require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Servidor da Livraria CRUD rodando em http://localhost:${PORT}`);
});