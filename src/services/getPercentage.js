import { survivorSchema } from "../models/survivorSchema.js";

export const get_infected_noninfected_percentage = async (req, res) => {
  try {
    const total_count = await survivorSchema.countDocuments({});
    const count_infected = await survivorSchema.countDocuments({
      infected: true,
    });

    const infectedPercentage = (count_infected / total_count) * 100;
    const nonInfectedPercentage = 100 - infectedPercentage;
    res.status(200).json({ infectedPercentage, nonInfectedPercentage });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};
