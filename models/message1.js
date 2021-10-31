"use strict";
let mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const opts = {
  createdAt: "created_at",
  updatedAt: "updated_at",
};

let messageSchema = new mongoose.Schema({
  message: {
    type: String,
  },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
});

messageSchema.plugin(timestamps, opts);

const message1Model = mongoose.model("message1", messageSchema);
module.exports = {
  message1Model: message1Model,
};
