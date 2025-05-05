import app from "./app.js";
import dotenv from "dotenv";
import Note from "./models/tourModel.js"
dotenv.config();

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${ process.env.PORT}!`)
);
