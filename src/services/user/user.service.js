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
    if (user && user.deleted) throw new Error("user has deleted this account");
    if (user) return await this.logIn({ email, password });
    return await this.register({ email, password });
  }

  async register({ email, password }) {
    let user = await this.dao.findByEmail(email);
    if (user) throw new Error("email already exists");
    const userId = await this.dao.create({ email, password });
    user = await this.dao.findById(userId);
    const result = { token: getTokens(user.id, user.email), user };
    return result;
  }

  async logIn({ email, password }) {
    let user = await this.dao.findByEmail(email);
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error("password is incorrect");
    user = await this.dao.findById(user.id);
    const result = { token: getTokens(user.id, user.email), user };
    return result;
  }

  async updatePassword(userId, { oldPassword, newPassword }) {
    const user = await this.dao.findByIdForUpdatePassword(userId);
    if (!user) throw new Error("user not found");
    if (user.deleted)
      throw new Error("can not update password for deleted account");
    const isValidPass = await bcrypt.compare(oldPassword, user.password);
    if (!isValidPass) throw new Error("password is incorrect");
    const newHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
    const updated = await this.dao.update(user.id, { password: newHash });
    return "password updated";
  }

  async updateUser(userId, data) {
    const user = await this.dao.findById(userId);
    const updated = await this.dao.update(user.id, data);
    return updated;
  }

  async updateUserAccessCode(userId, accessCode) {
    const user = await this.dao.findById(userId);
    const updated = await this.dao.update(user.id, { accessCode });
    return updated;
  }

  async updateUserCustomURL(userId, customURL) {
    const user = await this.dao.findById(userId);
    const updated = await this.dao.update(user.id, { customURL });
    return updated;
  }

  async delete(userId) {
    const user = await this.dao.findById(userId);
    if (user.deleted) throw new Error("account is already deleted");
    await this.dao.update(user.id, { deleted: true });
    return "account deleted";
  }

  async searchUsers(email, page, perPage) {
    const users = await this.dao.find(
      { email: new RegExp(email), deleted: { $ne: true } },
      page,
      perPage
    );
    return users;
  }

  async findById(id) {
    const result = await this.dao.findById(id);
    return result;
  }
}

const userService = new UserService({ dao: userDao });
module.exports = userService;
