const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../database/db");

exports.login = (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email e senha são obrigatórios",
      });
    }

    const user = db
      .prepare("SELECT * FROM auth_users WHERE email = ?")
      .get(email);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Credenciais inválidas",
      });
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Credenciais inválidas",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1h",
      }
    );

    res.json({
      success: true,
      message: "Login realizado com sucesso",
      token,
    });
  } catch (error) {
    next(error);
  }
};