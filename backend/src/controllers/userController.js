exports.getUsers = (req, res) => {
  res.json({
    success: true,
    users: [
      {
        id: 1,
        name: "Paulo"
      },
      {
        id: 2,
        name: "Cristiane"
      }
    ]
  });
};