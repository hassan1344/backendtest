import { app } from "./src/app/app.js";
import mongoose from "mongoose";
import config from "./src/configs/config.js";

const port = config.PORT || 8000;

try {
  await mongoose.connect(config.DB_URI);
  console.log("Connected to Database..");
} catch (e) {
  console.log(e.message);
}

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
