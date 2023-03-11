const userDao = require("../../dataAccess/user/user.dao");
const bcrypt = require("bcrypt");
const { getTokens } = require("../../config/jwt");

class UserService {
  dao = null;
  constructor(data) {
    this.dao = data.dao;
  }

  async findOrCreateUser({ email, password }) {
    const user = await this.dao.findByEmail(email);
    if (user) return await this.logIn({ email, password });
    return await this.register({ email, password });
  }

  async register({ email, password }) {
    let user = await this.dao.findByEmail(email);
    if (user) throw new Error("email already exists");
    const userId = await this.dao.create({ email, password });
    user = await this.dao.findById(userId);
    const result = { ...user, ...getTokens(user.id, user.email) };
    return result;
  }

  async logIn({ email, password }) {
    const user = await this.dao.findByEmail(email);
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error("password is incorrect");
    const result = { ...user, ...getTokens(user.id, user.email) };
    return result;
  }

  async searchUsers(email) {
    const users = await this.dao.find({ email: new RegExp(email) });
    return users;
  }
}

const userService = new UserService({ dao: userDao });
module.exports = userService;
