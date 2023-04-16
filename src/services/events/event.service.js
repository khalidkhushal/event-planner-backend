const eventDao = require("../../dataAccess/event/event.dao");
const { apiError } = require("../../utils/error");
const userService = require("../user/user.service");

class EventService {
  dao = null;
  constructor(data) {
    this.dao = data.dao;
  }

  async create(userId, data) {
    const user = await userService.findById(userId);
    const eventId = await this.dao.create({ userId: user.id, ...data });
    const event = await this.findById(eventId);
    const populatedEventData = await this.populateEvents([event]);
    return populatedEventData[0];
  }

  async list(page, perPage) {
    const { data, pagination } = await this.dao.listAll(page, perPage);
    const populatedEventsData = await this.populateEvents(data);
    return { data: populatedEventsData, pagination };
  }

  async listbyUserId(userId, page, perPage) {
    const { data, pagination } = await this.dao.listbyUserId(
      userId,
      page,
      perPage
    );
    const populatedEventsData = await this.populateEvents(data);
    return { data: populatedEventsData, pagination };
  }

  async getbyId(id) {
    const event = await this.dao.findById(id);
    const populatedEventData = await this.populateEvents([event]);
    return populatedEventData;
  }

  async update(userId, eventId, data) {
    const user = await userService.findById(userId);
    const event = await this.findById(eventId);
    if (user.id !== event.userId)
      throw new Error("You are not authorized to update this event data");
    const updated = await this.dao.update(eventId, data);
    const populatedEventData = await this.populateEvents([updated]);
    return populatedEventData[0];
  }

  // helper functions

  async findById(id) {
    const result = await this.dao.findById(id);
    return result;
  }

  async populateEvents(events) {
    return await Promise.all(
      events.map(async (event) => {
        const user = await userService.findById(event.userId);
        event.user = user;
        return event;
      })
    );
  }
}

const eventService = new EventService({ dao: eventDao });
module.exports = eventService;
