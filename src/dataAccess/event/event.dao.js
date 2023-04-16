const eventModel = require("../../models/events/events.model");
const MongoDAO = require("../MongoDAO");

class EventDAO extends MongoDAO {
  model = null;

  constructor(data) {
    super(data.model);
    this.model = data.model;
  }

  async listbyUserId(userId, page, perPage) {
    const list = await this.find({ userId }, page, perPage);
    return list;
  }

  async listAll(page, perPage) {
    const list = await this.find({}, page, perPage);
    return list;
  }
}

const eventDAO = new EventDAO({ model: eventModel });
module.exports = eventDAO;
