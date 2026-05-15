const userService = require("../services/userService");

const { createUserSchema } = require("../validators/userValidator");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await userService.findAllUsers();

    res.json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await userService.findUserById(id);

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

exports.createUser = async (req, res, next) => {
  try {
    const validatedData = createUserSchema.parse(req.body);

    const user = await userService.createUser(validatedData.name);

    res.status(201).json({
      success: true,
      message: "Usuário criado com sucesso",
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "O campo name é obrigatório",
      });
    }

    const existingUser = await userService.findUserById(id);

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado",
      });
    }

    const updatedUser = await userService.updateUser(id, name);

    res.json({
      success: true,
      message: "Usuário atualizado com sucesso",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedUser = await userService.deleteUser(id);

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