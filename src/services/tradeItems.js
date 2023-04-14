import { survivorSchema } from "../models/survivorSchema.js";

export const trade_items = async (req, res) => {
  const { senderId, receiverId, senderItems, receiverItems } = req.body;

  const find_survivors = await survivorSchema.find({
    _id: { $in: [senderId, receiverId] },
  });

  if (!find_survivors[0].infected && !find_survivors[1].infected) {
    const senderPoints = calculateTotalPoints(senderItems);
    const receiverPoints = calculateTotalPoints(receiverItems);

    if (senderPoints === receiverPoints) {
      updateInventory(find_survivors[0], senderItems, false);
      updateInventory(find_survivors[1], receiverItems, true);

      Promise.all([find_survivors[0].save(), find_survivors[1].save()])
        .then(() => {
          res.json({ message: "Items traded successfully" });
        })
        .catch((err) => {
          res.status(500).json({ error: "Failed to trade items" });
        });
    } else {
      res.status(400).json({
        error: "Sender and receiver must offer the same amount of points",
      });
    }
  } else {
    res.status(400).json({ error: "Infected survivors cannot trade" });
  }
};

function calculateTotalPoints(items) {
  let totalPoints = 0;
  for (const item of items) {
    switch (item.item) {
      case "water":
        totalPoints += item.quantity * 4;
        break;
      case "food":
        totalPoints += item.quantity * 3;
        break;
      case "medication":
        totalPoints += item.quantity * 2;
        break;
      case "ammunition":
        totalPoints += item.quantity * 1;
        break;
    }
  }
  return totalPoints;
}

function updateInventory(survivor, items, remove) {
  for (const item of items) {
    const index = survivor.inventory.findIndex((i) => i.item === item.item);
    if (index !== -1) {
      if (remove) {
        survivor.inventory[index].quantity -= item.quantity;
        if (survivor.inventory[index].quantity <= 0) {
          survivor.inventory.splice(index, 1);
        }
      } else {
        survivor.inventory[index].quantity += item.quantity;
      }
    } else {
      if (!remove) {
        survivor.inventory.push(item);
      }
    }
  }
}
