import { survivorSchema } from "../models/survivorSchema.js";

export const infect_survivor = async (req, res) => {
  try {
    const { id } = req.params;
    const { infected } = req.body;

    if (id === undefined || infected === undefined) {
      return res.status(400).json({ message: "Invalid request parameters" });
    }

    if (infected === false) {
      return res
        .status(403)
        .json({ message: "Reverting infection is not allowed" });
    }

    const update_infected = await survivorSchema.findByIdAndUpdate(
      id,
      { $set: { infected } },
      { new: true }
    );

    if (update_infected) {
      return res
        .status(200)
        .json({ message: "Survivor Flagged as Infected", update_infected });
    } else {
      return res.status(404).json({ message: "Survivor not found" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};
