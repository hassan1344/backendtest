import express from "express";
import { add_survivor } from "../services/addSurvivor.js";
import { update_location } from "../services/updateLocation.js";
import { infect_survivor } from "../services/infectSurvivor.js";
import { get_infected_noninfected_percentage } from "../services/getPercentage.js";

const router = express.Router();

router.post("/survivors", add_survivor);
router.put("/survivor/update-location/:id", update_location);
router.put("/survivor/infect-survivor/:id", infect_survivor);
router.get("/survivor/get-percentage", get_infected_noninfected_percentage);
export default router;
