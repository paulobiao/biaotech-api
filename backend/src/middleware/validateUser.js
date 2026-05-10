const validateUser = (req, res, next) => {
  const { name } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "O campo name é obrigatório",
    });
  }

  next();
};

module.exports = validateUser;