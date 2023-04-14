import dotenv from "dotenv";
import findconfig from "find-config";

dotenv.config({ path: findconfig(".env") });

export default {
  DB_URI: process.env.DB_URI,
  PORT: process.env.PORT,
};
