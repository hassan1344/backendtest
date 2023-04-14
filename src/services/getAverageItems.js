import { survivorSchema } from "../models/survivorSchema.js";

export const get_average_items = async (req, res) => {
  try {
    const totalSurvivors = await survivorSchema.find();
    const survivorCount = totalSurvivors.length;

    const sum = {
      water: 0,
      food: 0,
      medication: 0,
      ammunition: 0,
    };

    for (const survivor of totalSurvivors) {
      for (const item of survivor.inventory) {
        switch (item.item) {
          case "water":
            sum.water += item.quantity;
            break;
          case "food":
            sum.food += item.quantity;
            break;
          case "medication":
            sum.medication += item.quantity;
            break;
          case "ammunition":
            sum.ammunition += item.quantity;
            break;
        }
      }
    }

    const average = {
      water: survivorCount > 0 ? sum.water / survivorCount : 0,
      food: survivorCount > 0 ? sum.food / survivorCount : 0,
      medication: survivorCount > 0 ? sum.medication / survivorCount : 0,
      ammunition: survivorCount > 0 ? sum.ammunition / survivorCount : 0,
    };

    res.json({ average });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};