const User = require("../models/user.model");

const createUser = async (data) => {
  return await User.create(data);
};

const getUsers = async () => {
  return await User.findAll();
};

const getUserById = async (id) => {
  return await User.findByPk(id);
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
};
