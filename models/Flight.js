const mongoose = require("./connection");

const { Schema, model } = mongoose;

// make flights schema
const flightSchema = new Schema({
  airline: {
    type: String,
    enum: ["American", "Southwest", "United"],
  },
  flightNo: {
    type: Number,
    minimum: 10,
    maximum: 9999,
    required: true,
  },
  departs: {
    type: Date,
    default: new Date().setFullYear(new Date().getFullYear() + 1), //One year from date created
  },
});

// make the flight model
const Flight = model("Flight", flightSchema);

module.exports = Flight;
