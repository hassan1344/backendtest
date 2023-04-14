import { survivorSchema } from "../models/survivorSchema.js";

export const update_location = async (req, res) => {
  try {
    const { id } = req.params;
    const { latitude, longitude } = req.body;

    if (!latitude && !longitude) {
      return res
        .status(400)
        .json({ message: "At least one location parameter required" });
    }
    const updated_loc = await survivorSchema.findByIdAndUpdate(
      id,
      {
        $set: {
          "lastLocation.latitude": latitude,
          "lastLocation.longitude": longitude,
        },
      },
      { new: true }
    );

    if (updated_loc) {
      return res
        .status(200)
        .json({ message: "Location successfully updated", updated_loc });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};
