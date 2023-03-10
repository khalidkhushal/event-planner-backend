const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const schemaFields = {
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
};

const userSchema = new Schema(schemaFields, { timestamps: true });

userSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, saltRounds);
  this.password = hash;
  next();
});

const userModel = model("user", userSchema);
module.exports = userModel;
