import { Router } from "express";
import availabilityController from "../controllers/availability.controller";

const router = Router();

// GET /availability
router.get("/", (req: any, res: any) => {
  availabilityController.getAvailability(req, res);
});

// module.exports = router;
export default router;
