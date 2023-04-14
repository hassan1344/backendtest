import { survivorSchema } from "../models/survivorSchema.js";

export const get_average_items = async (req, res) => {
  try {
    const result = await survivorSchema.aggregate([
      { $unwind: "$inventory" },
      {
        $group: {
          _id: null,
          averageItems: { $avg: "$inventory.quantity" },
        },
      },
    ]);
    const averageItems = result[0]?.averageItems || 0;
    res.status(200).send({ averageItems });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};
