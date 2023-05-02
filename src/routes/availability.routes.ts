const router = require("express").Router();
const availabilityController = require("../controllers/availability.controller");

// GET /availability
router.get("/", (req: any, res: any) => {
  availabilityController.getAvailability(req, res);
});

module.exports = router;
