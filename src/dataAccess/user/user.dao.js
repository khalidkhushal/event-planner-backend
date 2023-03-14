const userModel = require("../../models/user/user.model");
const MongoDAO = require("../MongoDAO");

class UserDAO extends MongoDAO {
  model = null;

  constructor(data) {
    super(data.model);
    this.model = data.model;
  }

  async findByEmail(email) {
    const user = await this.model.find({ email, deleted:{$ne: true}});
    if (user[0]) {
      const newData = {};
      Object.assign(newData, user[0]?._doc);
      newData.id = user[0]?._doc._id;
      delete newData._id;
      delete newData.__v;
      return newData;
    }
    return user[0];
  }
  
}

const userDAO = new UserDAO({ model: userModel });
module.exports = userDAO;
