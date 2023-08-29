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
  const newFlight = new Flight();

  Flight.find({})
    .then((foundFlights) => {
      foundFlights.filter((flight) => {
        return flight.departs === null;
      }).departs = newFlight.departs;

      res.render("flights/index", {
        flights: foundFlights,
      });
    })
    .catch((error) => res.status(400).json({ error }));
});

// NEW
router.get("/new", (req, res) => {
  res.render("flights/new");
});

// DELETE
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  console.log(req.body);

  Flight.deleteOne({ _id: id })
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
