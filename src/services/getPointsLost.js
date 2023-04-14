import { survivorSchema } from "../models/survivorSchema.js";

export const get_points_lost = async (req, res) => {
  try {
    const infectedSurvivor = await survivorSchema.findById(req.params.id);
    if (!infectedSurvivor) {
      return res.status(404).json({ message: "Infected survivor not found" });
    }
    if (!infectedSurvivor.infected) {
      return res
        .status(400)
        .json({ message: "Specified survivor is not infected" });
    }

    const survivors = await survivorSchema.find({ infected: false });
    let totalPointsLost = 0;

    for (const survivor of survivors) {
      for (const item of survivor.inventory) {
        switch (item.item) {
          case "water":
            totalPointsLost += item.quantity * 4;
            break;
          case "food":
            totalPointsLost += item.quantity * 3;
            break;
          case "medication":
            totalPointsLost += item.quantity * 2;
            break;
          case "ammunition":
            totalPointsLost += item.quantity * 1;
            break;
          default:
            throw new Error(`Unknown item type: ${item.item}`);
        }
      }
    }

    res.json({ pointsLost: totalPointsLost });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
