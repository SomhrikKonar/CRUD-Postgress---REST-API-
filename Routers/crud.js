import { Router } from "express";
import { Task } from "../Models/task.js";

const router = Router();

//add task
router.post("/add", async (req, res) => {
  const data = { ...req.body };
  await Task.create({ ...data })
    .then(() => {
      res.status(201).send("Task added successfully");
    })
    .catch((err) => res.status(400).send({ err }.err.name));
});

//update task
router.put("/update", async (req, res) => {
  const data = { ...req.body };
  await Task.update(
    {
      ...data,
    },
    {
      where: { title: data?.title },
    }
  )
    .then(() => res.status(200).send("Task Updated successfully"))
    .catch((err) => {
      console.log(err);
      res.status(400).send({ err }.err.name);
    });
});

//get all tasks
router.get("/allTasks", async (req, res) => {
  await Task.findAll()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send({ err }.err.name));
});

//delete task
router.delete("/delete/:taskId", async (req, res) => {
  let taskId = req.params.taskId;
  await Task.destroy({
    where: { _id: taskId },
  })
    .then(() => res.status(200).send("Task deleted successfully"))
    .catch((err) => res.status(400).send({ err }.err.name));
});

//get specific tasks
router.post("/findTask", async (req, res) => {
  let data = req.body;
  if (!data || data === {}) res.status(400).send("No query parameter");
  await Task.findAll({ where: { ...data } })
    .then((tasks) => res.status(200).send(tasks))
    .catch((err) => res.status(400).send({ err }.err.name));
});

export default router;
