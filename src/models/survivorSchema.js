import mongoose from "mongoose";

export const survivorSchema = mongoose.model(
  "Survivor",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    lastLocation: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
    },
    inventory: [
      {
        item: {
          type: String,
          enum: ["water", "food", "medication", "ammunition"],
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    infected: {
      type: Boolean,
      default: false,
    },
  })
);
