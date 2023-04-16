class MongoDAO {
  model = null;
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    const result = await this.model.create(data);
    return result._id;
  }

  async find(query, page = 1, perPage = 10, sort = { createdAt: "-1" }) {
    if (page < 1) throw Error("page can not be less than 1");
    if (perPage < 1) throw Error("perPage can not be less than 1");

    const skip = (page - 1) * perPage - 1 > 0 ? (page - 1) * perPage - 1 : 0;
    const limit = page > 1 ? perPage + 2 : perPage + 1;

    const response = await this.model
      .find({ ...query })
      .sort(sort)
      .limit(limit)
      .skip(skip);

    const result = response.map((d) => {
      const newData = object;
      newData.id = object._id;
      delete newData._id;
      delete newData.password;
      delete newData.__v;
      return newData;
    });

    let hasNext = null;
    if (page > 1) {
      hasNext = result.length >= perPage + 2;
    } else if (page == 1) {
      hasNext = result.length == perPage + 1;
    } else {
      hasNext = false;
    }

    const hasPrevious = page > 1 ? true : false;

    if (result.length > perPage && page == 1) {
      result.pop();
    } else if (result.length == perPage + 2 && page > 1) {
      result.pop();
      result.shift();
    } else if (result.length == perPage + 1 && page > 1) {
      result.shift();
    } else if (result.length <= perPage && page > 1) {
      result.shift();
    }

    const pagination = {
      page,
      perPage,
      hasNext,
      hasPrevious,
    };
    return {
      data: result,
      pagination,
    };
  }

  async findById(id) {
    const data = await this.model.findById(id);
    const newData = object;
    newData.id = object._id;
    delete newData._id;
    delete newData.password;
    delete newData.__v;
    return newData;
  }

  async delete(id) {
    const deleted = await this.model.findByIdAndDelete(id);
    return deleted;
  }

  async update(id, data) {
    const updated = await this.model.findByIdAndUpdate(id, data);
    console.log({ updated });
    const newData = updated;
    newData.id = updated._id;
    delete newData._id;
    delete newData.password;
    delete newData.__v;
    return newData;
  }
}

module.exports = MongoDAO;
