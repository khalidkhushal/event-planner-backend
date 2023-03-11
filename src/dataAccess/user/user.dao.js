const userModel = require("../../models/user/user.model");
const MongoDAO = require("../MongoDAO");

class UserDAO extends MongoDAO {
  model = null;

  constructor(data) {
    super(data.model);
    this.model = data.model;
  }
}

const userDAO = new UserDAO({ model: userModel });
module.exports = userDAO;
