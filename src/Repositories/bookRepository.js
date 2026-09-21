const fs = require('fs/promises');
const path = require('path');
const FILE = path.join(__dirname, '../../data/books.json');

//le os dados do JSON e converte em um array 
async function readBooks() {
  try {
    const data = await fs.readFile(FILE, 'utf-8');
    
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      return [];
    }
    throw err;
  }
}

//escreve a lista atualizada
async function writeBooks(books) {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  
  await fs.writeFile(FILE, JSON.stringify(books, null, 2));
}

module.exports = { readBooks, writeBooks };
