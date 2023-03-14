const userDao = require("../../dataAccess/user/user.dao");
const bcrypt = require("bcrypt");
const { getTokens } = require("../../config/jwt");
const { SALT_ROUNDS } = require("../../utils/secret");

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
    console.log("log in")
    const user = await this.dao.findByEmail(email);
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error("password is incorrect");
    const result = { ...user, ...getTokens(user.id, user.email) };
    return result;
  }

  async updatePassword(userId, {oldPassword, newPassword}) {
    const user = await this.dao.findById(userId)
    const isValidPass = await bcrypt.compare(oldPassword, user.password);
    if (!isValidPass) throw new Error("password is incorrect");
    const newHash = await bcrypt.hash(newPassword, SALT_ROUNDS)
    const updated = await this.dao.update(user.id, {password: newHash})
    return "password updated"
  }

  async delete(userId){
    const user = await this.dao.findById(userId)
    await this.dao.update(user.id, {deleted: true})
    return "account deleted"
  }

  async searchUsers(email) {
    const users = await this.dao.find({ email: new RegExp(email) });
    return users;
  }
}

const userService = new UserService({ dao: userDao });
module.exports = userService;
