class MongoDAO {
  model = null;
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    const id = await this.model.create(data);
    return id;
  }

  async find(query, sort = { createdAt: -1 }) {
    const data = await this.model.find({ ...query }).sort(sort);
    const result = data.map((d) => {
      const newData = {};
      Object.assign(newData, d._doc);
      newData.id = d._id;
      delete newData._id;
      delete newData.password;
      delete newData.__v;
      return newData;
    });
    return result;
  }

  async findById(id) {
    const data = await this.model.findById(id);
    const newData = {};
    Object.assign(newData, data._doc);
    newData.id = data._id;
    delete newData._id;
    delete newData.__v;
    return newData;
  }

  async delete(id) {
    const deleted = await this.model.findByIdAndDelete(id);
    return deleted;
  }

  async update(id, data) {
    const obj = await this.findById(id);
    const newObj = await this.model.findByIdAndUpdate(id, data);
    return newObj;
  }
}

module.exports = MongoDAO;
