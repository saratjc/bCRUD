# Livraria CRUD

API REST com CRUD completo de livros, validação com Zod e status HTTP corretos.

## Instalação

```bash
npm install
```

## Rodando em desenvolvimento

```bash
npm run dev
```

O servidor sobe em `http://localhost:3002` (ou na PORT definida em `.env`).

## Endpoints

| Método | Rota                    | Descrição                          |
|--------|--------------------------|-------------------------------------|
| GET    | /books                  | Lista todos os livros               |
| GET    | /books?category=valor   | Lista livros filtrados por categoria|
| GET    | /books/:id              | Retorna um livro pelo ID            |
| POST   | /books                  | Cadastra um novo livro              |
| PUT    | /books/:id              | Atualiza um livro existente         |
| DELETE | /books/:id              | Remove um livro                     |

## Exemplo de body para POST /books

```json
{
  "title": "1984",
  "author": "George Orwell",
  "price": 45.90,
  "category": "Ficção",
  "stock": 12
}
```

Os dados são persistidos em `data/books.json`.