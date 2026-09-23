//lê o .env
require('dotenv').config();
//importa as configurações de rotas middlewears etc
const app = require('./app');

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Servidor da Livraria CRUD rodando em http://localhost:${PORT}`);
});