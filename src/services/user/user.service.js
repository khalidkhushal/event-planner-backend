const userDao = require("../../dataAccess/user/user.dao");

class UserService {
  dao = null;
  constructor(data) {
    this.dao = data.dao;
  }

  async createUser({ email, password }) {
    const user = await this.dao.findByEmail(email);
    if (user) return user;
    const userId = await this.dao.create({ email, password });
    return await this.dao.findById(userId);
  }

  async searchUsers(email) {
    const users = await this.dao.find({ email: new RegExp(email) });
    return users;
  }
}

const userService = new UserService({ dao: userDao });
module.exports = userService;
