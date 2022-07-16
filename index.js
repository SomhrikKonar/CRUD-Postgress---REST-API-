import express from "express";
import cors from "cors";
import { db } from "./DB/db.js";
import crudRouter from "./Routers/crud.js";

//initialising app
const app = express();

//initialising port
const PORT = process.env.PORT || 8080;

//app setup
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use("/crud", crudRouter);

//connection with db
db.authenticate()
  .then(() => {
    console.log("Connection Successful");
    app.listen(PORT, () => {
      console.log("Listening to PORT =", PORT);
    });
  })
  .catch((err) => console.log(err));
