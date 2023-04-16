const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../../utils/secret");

const schemaFields = {
  username: {
    type: String,
    required: true,
    index: { unique: true, partialFilterExpression: { deleted: false } },
  },
  password: { type: String, required: true },
  email: { type: String, required: false, default: null },
  phoneNumber: { type: String, required: false, default: null },
  paymentDone: { type: Boolean, required: false, default: false },
  accessCode: { type: String, required: false, default: null },
  customeURL: { type: String, required: false, default: null },
  deleted: { type: Boolean, required: false, default: false },
};

const userSchema = new Schema(schemaFields, { timestamps: true });

userSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, SALT_ROUNDS);
  this.password = hash;
  next();
});

const userModel = model("user", userSchema);
module.exports = userModel;
