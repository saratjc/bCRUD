const { z } = require('zod');

//schema de cadastro
const createBookSchema = z.object({
    title: z.string().trim().min(1, 'title é obrigatório e não pode ser vazio'),
    author: z.string().trim().min(1, 'author é obrigatório e não pode ser vazio'),
    price: z.number().positive('price deve ser um número positivo'),
    category: z.string().trim().min(1, 'category é obrigatório e não pode ser vazio'),
    stock: z
    .number()
    .int('stock deve ser um número inteiro')
    .min(0, 'stock não pode ser negativo'),
});

//schema de atualização
const updateBookSchema = z
  .object({
    title: z.string().trim().min(1, 'title não pode ser vazio').optional(),
    author: z.string().trim().min(1, 'author não pode ser vazio').optional(),
    price: z.number().positive('price deve ser um número positivo').optional(),
    category: z.string().trim().min(1, 'category não pode ser vazio').optional(),
    stock: z
    .number()
    .int('stock deve ser um número inteiro')
    .min(0, 'stock não pode ser negativo')
    .optional(),
  })
  //adiciona uma regra customizada
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Envie ao menos um campo para atualizar',
  });

module.exports = { createBookSchema, updateBookSchema };
