const mongoose = require("mongoose");

const BListSchema = mongoose.Schema(
  {
    token: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const BlistModel = mongoose.model("blacklist", BListSchema);

module.exports = {
  BlistModel,
};
