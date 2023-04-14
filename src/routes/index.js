import express from "express";
import { add_survivor } from "../services/addSurvivor.js";
import { update_location } from "../services/updateLocation.js";

const router = express.Router();

router.post("/survivors", add_survivor);
router.put("/survivor/updatelocation/:id", update_location);

export default router;
