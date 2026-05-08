const db = require('../database/db');

exports.getUsers = (req, res) => {
  const users = db.prepare('SELECT * FROM users').all();

  res.json({
    success: true,
    users
  });
};

exports.createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: 'O campo name é obrigatório'
    });
  }

  const result = db.prepare('INSERT INTO users (name) VALUES (?)').run(name);

  const newUser = db
    .prepare('SELECT * FROM users WHERE id = ?')
    .get(result.lastInsertRowid);

  res.status(201).json({
    success: true,
    message: 'Usuário criado com sucesso',
    user: newUser
  });
};