exports.getUsers = (req, res) => {
  res.json({
    success: true,
    users: [
      { id: 1, name: "Paulo" },
      { id: 2, name: "Cristiane" }
    ]
  });
};

exports.createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "O campo name é obrigatório"
    });
  }

  res.status(201).json({
    success: true,
    message: "Usuário criado com sucesso",
    user: {
      id: 3,
      name
    }
  });
};