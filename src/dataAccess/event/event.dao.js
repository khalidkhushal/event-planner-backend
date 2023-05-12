const EventDataModel = require("../../datamodels/event/event.datamodel");
const eventModel = require("../../models/events/events.model");
const MongoDAO = require("../MongoDAO");

class EventDAO extends MongoDAO {
  model = null;

  constructor(data) {
    super({ model: data.model, dataModel: data.dataModel });
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

const eventDAO = new EventDAO({ model: eventModel, dataModel: EventDataModel });
module.exports = eventDAO;
