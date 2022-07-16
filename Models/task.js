import Sequelize from "sequelize";
import { db } from "../DB/db.js";

export const Task = db.define("Task", {
  _id: {
    type: Sequelize.UUID,
    allowNull: false,
    unique: true,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  title: { type: Sequelize.STRING, unique: true },
  description: { type: Sequelize.STRING },
  status: { type: Sequelize.ENUM("pending", "ongoing", "completed") },
  //   createdAt: Sequelize.DATE, ----automaticaly handled
  //   updatedAt: Sequelize.DATE, ----automaticaly handled
  dueDate: {
    type: Sequelize.DATEONLY,
    validate: {
      customValidator(value) {
        let due_date = new Date(value);
        let today = new Date();
        if (
          due_date.getFullYear() < today.getFullYear() ||
          due_date.getMonth() < today.getMonth() ||
          due_date.getDate() < today.getDate()
        ) {
          throw new Error("Invalid date");
        }
      },
    },
  },
});

// (async () => {
//   Task.sync({ force: true });
// })();
