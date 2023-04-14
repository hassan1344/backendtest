import express from "express";
import { add_survivor } from "../services/addSurvivor.js";
import { update_location } from "../services/updateLocation.js";
import { infect_survivor } from "../services/infectSurvivor.js";

const router = express.Router();

router.post("/survivors", add_survivor);
router.put("/survivor/update-location/:id", update_location);
router.put("/survivor/infect-survivor/:id", infect_survivor);

export default router;
