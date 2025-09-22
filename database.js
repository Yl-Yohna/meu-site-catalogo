const sqlite3 = require('sqlite3').verbose();

// Cria ou abre o banco
const db = new sqlite3.Database('./catalogo.db', (err) => {
  if (err) return console.error(err.message);
  console.log('✅ Conectado ao SQLite database.');
});

// Cria tabela de produtos, se não existir
db.run(`CREATE TABLE IF NOT EXISTS produtos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT,
  preco REAL,
  imagem TEXT
)`);

module.exports = db;
