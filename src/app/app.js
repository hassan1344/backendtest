import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  return res.send("Service is available...");
});

app.use("/api", router);

export { app };
