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

  const result = db
    .prepare('INSERT INTO users (name) VALUES (?)')
    .run(name);

  res.status(201).json({
    success: true,
    message: 'Usuário criado com sucesso',
    user: {
      id: result.lastInsertRowid,
      name
    }
  });
};

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: 'O campo name é obrigatório'
    });
  }

  const user = db
    .prepare('SELECT * FROM users WHERE id = ?')
    .get(id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'Usuário não encontrado'
    });
  }

  db.prepare('UPDATE users SET name = ? WHERE id = ?')
    .run(name, id);

  const updatedUser = db
    .prepare('SELECT * FROM users WHERE id = ?')
    .get(id);

  res.json({
    success: true,
    message: 'Usuário atualizado com sucesso',
    user: updatedUser
  });
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;

  const user = db
    .prepare('SELECT * FROM users WHERE id = ?')
    .get(id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'Usuário não encontrado'
    });
  }

  db.prepare('DELETE FROM users WHERE id = ?').run(id);

  res.json({
    success: true,
    message: 'Usuário deletado com sucesso',
    user
  });
};