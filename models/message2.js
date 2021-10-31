"use strict";
let mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const opts = {
  createdAt: "created_at",
  updatedAt: "updated_at",
};

let message2Schema = new mongoose.Schema({
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

message2Schema.plugin(timestamps, opts);

const message2Model = mongoose.model("message2", message2Schema);
module.exports = {
  message2Model: message2Model,
};
