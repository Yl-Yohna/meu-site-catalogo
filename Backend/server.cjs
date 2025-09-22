const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Lista de produtos (pode adicionar mais)
const produtos = [
  { id: 1, nome: "Produto 1", descricao: "Descrição do Produto 1", preco: 99.9, imagem_url: "/assets/img/produto1.jpg" },
  { id: 2, nome: "Produto 2", descricao: "Descrição do Produto 2", preco: 149.9, imagem_url: "/assets/img/produto2.jpg" },
  { id: 3, nome: "Produto 3", descricao: "Descrição do Produto 3", preco: 199.9, imagem_url: "/assets/img/produto3.jpg" }
];

app.get('/produtos', (req, res) => {
  res.json(produtos);
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

