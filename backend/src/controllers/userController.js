const db = require("../database/db");

exports.getUsers = (req, res, next) => {
  try {
    const users = db.prepare("SELECT * FROM users").all();

    res.json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserById = (req, res, next) => {
  try {
    const { id } = req.params;

    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado",
      });
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.createUser = (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "O campo name é obrigatório",
      });
    }

    const cleanName = name.trim();

    const result = db
      .prepare("INSERT INTO users (name) VALUES (?)")
      .run(cleanName);

    res.status(201).json({
      success: true,
      message: "Usuário criado com sucesso",
      user: {
        id: result.lastInsertRowid,
        name: cleanName,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "O campo name é obrigatório",
      });
    }

    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado",
      });
    }

    const cleanName = name.trim();

    db.prepare("UPDATE users SET name = ? WHERE id = ?").run(cleanName, id);

    const updatedUser = db.prepare("SELECT * FROM users WHERE id = ?").get(id);

    res.json({
      success: true,
      message: "Usuário atualizado com sucesso",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = (req, res, next) => {
  try {
    const { id } = req.params;

    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado",
      });
    }

    db.prepare("DELETE FROM users WHERE id = ?").run(id);

    res.json({
      success: true,
      message: "Usuário deletado com sucesso",
      user,
    });
  } catch (error) {
    next(error);
  }
};