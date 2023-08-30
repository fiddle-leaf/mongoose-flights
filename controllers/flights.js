/**     *       *       *       *       *       *      *    **
 *  *       *   Import Our Dependencies    *       *      *  *
 **     *       *       *       *       *       *      *    **
 */
const express = require("express");
const Flight = require("../models/Flight");

/**     *       *       *       *       *       *      *    **
 *  *       *       *     Create Router     *       *        *
 **     *       *       *       *       *       *      *    **
 */
const router = express.Router();

/**     *       *       *       *       *       *       *      **
 *  *       *       *      *    Routes      *       *       *   *
 * Remember INDUCES order: index, new, delete, update, edit, show
 **     *       *       *       *       *       *       *      **
 */

// INDEX
router.get("/", (req, res) => {
  switch (req.query.filter) {
    case "descending":
      Flight.find()
        .sort({ departs: -1 })
        .then((desFlights) => {
          console.log(desFlights);
          res.render("flights/index", { flights: desFlights });
        })
        .catch((error) => res.status(400).json({ error }));
      break;
    case "ascending":
      Flight.find()
        .sort({ departs: 1 })
        .then((desFlights) => {
          console.log(desFlights);
          res.render("flights/index", { flights: desFlights });
        })
        .catch((error) => res.status(400).json({ error }));
      break;

    default:
      Flight.find({})
        .then((foundFlights) => {
          res.render("flights/index", {
            flights: foundFlights,
          });
        })
        .catch((error) => res.status(400).json({ error }));
  }
});

// NEW
router.get("/new", (req, res) => {
  // in-memory flight to grab default date
  const newFlight = new Flight();
  const date = newFlight.departs;
  // format string for default value in form
  //yyyy-MM-ddThh:mm
  const departsDt = date.toISOString().slice(0, 16);
  console.log(departsDt);

  res.render("flights/new", { departs: departsDt });
});

// DELETE
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Flight.findOneAndDelete({ _id: id })
    .then((data) => res.redirect("/flights"))
    .catch((error) => res.status(400).json({ error }));
});

// UPDATE
router.put("/:id", (req, res) => {
  const id = req.params.id;

  Flight.updateOne({ _id: id }, req.body, { new: true })
    .then((data) => res.redirect("/flights"))
    .catch((error) => res.status(400).json({ error }));
});

// CREATE
router.post("/", (req, res) => {
  Flight.create(req.body)
    .then((data) => res.redirect("/flights"))
    .catch((error) => res.status(400).json({ error }));
});

// EDIT
router.get("/:id/edit", (req, res) => {
  const id = req.params.id;

  Flight.findOne({ _id: id })
    .then((foundFlight) => {
      res.render("flights/edit", {
        flight: foundFlight,
      });
    })
    .catch((error) => res.status(400).json({ error }));
});

// SHOW
router.get("/:id", (req, res) => {
  const id = req.params.id;

  Flight.findOne({ _id: id })
    .then((foundFlight) => {
      res.render("flights/show", {
        flight: foundFlight,
      });
    })
    .catch((error) => res.status(400).json({ error }));
});

module.exports = router;
