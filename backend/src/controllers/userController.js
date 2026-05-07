const users = [
  { id: 1, name: "Paulo" },
  { id: 2, name: "Cristiane" }
];

exports.getUsers = (req, res) => {
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
      message: "O campo name é obrigatório"
    });
  }

  const newUser = {
    id: users.length + 1,
    name
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    message: "Usuário criado com sucesso",
    user: newUser
  });
};