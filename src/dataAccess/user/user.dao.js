const userDataModel = require("../../datamodels/user/user.datamodel");
const userModel = require("../../models/user/user.model");
const MongoDAO = require("../MongoDAO");

class UserDAO extends MongoDAO {
  model = null;

  constructor(data) {
    super({ model: data.model, dataModel: data.dataModel });
    this.model = data.model;
  }

  async findByEmail(email) {
    const user = await this.model.find({ email });
    if (user[0]) return this.processResult(user[0]);
    return user[0];
  }

  async findByIdForUpdatePassword(id) {
    const user = await this.model.find({ _id: id });
    if (user[0]) return this.processResult(user[0]);
    return user[0];
  }

  processResult(object) {
    const newData = object;
    newData.id = object._id;
    delete newData._id;
    delete newData.__v;
    return newData;
  }
}

const userDAO = new UserDAO({ model: userModel, dataModel: userDataModel });
module.exports = userDAO;
