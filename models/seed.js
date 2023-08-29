const mongoose = require("./connection");
const Flight = require("./Flight");

const db = mongoose.connection;

db.on("open", () => {
  // array of starter flights
  const flights = [
    {
      airline: "American",
      flightNo: 6135,
      departs: "2024-01-13T04:20",
    },
    {
      airline: "Southwest",
      flightNo: 2135,
      departs: "2023-11-02T18:15",
    },
    {
      airline: "United",
      flightNo: 5098,
      departs: "2024-07-18T11:17",
    },
  ];

  // Delete all flights
  Flight.deleteMany({})
    .then((data) => {
      Flight.create(flights)
        .then((data) => {
          db.close();
        })
        .catch((error) => {
          db.close();
        });
    })
    .catch((error) => {
      db.close();
    });
});
