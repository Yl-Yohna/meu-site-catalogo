
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const db = require('./database'); // nosso SQLite

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configuração do multer (upload de imagens)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });


// Rota para listar produtos
app.get('/produtos', (req, res) => {
  db.all('SELECT * FROM produtos', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Rota para adicionar produto com imagem
app.post('/produtos', upload.single('imagem'), (req, res) => {
  const { nome, preco } = req.body;
  const imagem = req.file ? req.file.filename : null;

  db.run(
    'INSERT INTO produtos (nome, preco, imagem) VALUES (?, ?, ?)',
    [nome, preco, imagem],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, nome, preco, imagem });
    }
  );
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
app.delete('/produtos/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM produtos WHERE id = ?', [id], function(err){
    if(err) return res.status(500).send(err.message);
    res.send({ message: 'Produto removido' });
  });
});
