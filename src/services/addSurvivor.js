import { survivorSchema } from "../models/survivorSchema.js";

export const add_survivor = async (req, res) => {
  try {
    const { name, age, gender, lastLocation, inventory } = req.body;

    if (!name || !age || !gender || !lastLocation || !inventory) {
      return res.status(400).json({ message: "Invalid request parameters" });
    }
    const survivor = new survivorSchema({
      name,
      age,
      gender,
      lastLocation,
      inventory,
    });

    await survivor.save();

    res.status(201).json({ message: "Survivor created" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};
