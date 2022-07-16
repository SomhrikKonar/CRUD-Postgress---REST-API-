import { Sequelize } from "sequelize";
import dotEnv from "dotenv";

//initialise dotenv
dotEnv.config();

export const db = new Sequelize("todo", "postgres", process.env.PASSWORD, {
  host: "localhost",
  dialect: "postgres",
  port: 5000,
});
