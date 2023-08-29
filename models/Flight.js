const mongoose = require("./connection");

const { Schema, model } = mongoose;

const destinationSchema = new Schema({
  airport: {
    type: String,
    enum: ["AUS", "DAL", "LAX", "SAN", "SEA"],
  },

  arrival: Date,
});

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
    //One year from date created
    default: new Date().setFullYear(new Date().getFullYear() + 1),
  },
  airport: {
    type: String,
    enum: ["AUS", "DAL", "LAX", "SAN", "SEA"],
    default: "SAN",
  },
  destinations: [destinationSchema],
});

// make the flight model
const Flight = model("Flight", flightSchema);

module.exports = Flight;
