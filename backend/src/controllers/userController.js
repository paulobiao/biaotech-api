const userService = require("../services/userService");

exports.getUsers = (req, res, next) => {
  try {
    const users = userService.findAllUsers();

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

    const user = userService.findUserById(id);

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

    const user = userService.createUser(name);

    res.status(201).json({
      success: true,
      message: "Usuário criado com sucesso",
      user,
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

    const existingUser = userService.findUserById(id);

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado",
      });
    }

    const updatedUser = userService.updateUser(id, name);

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

    const deletedUser = userService.deleteUser(id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado",
      });
    }

    res.json({
      success: true,
      message: "Usuário deletado com sucesso",
      user: deletedUser,
    });
  } catch (error) {
    next(error);
  }
};