import express from "express";
import { add_survivor } from "../services/addSurvivor.js";

const router = express.Router();

router.post("/survivors", add_survivor);

export default router;
