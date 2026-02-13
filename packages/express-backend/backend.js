import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import {
  findAllUsers,
  findUsersByName,
  findUsersByJob,
  findUsersByNameAndJob,
  findUserById,
  createUser,
  deleteUserById,
} from "./services/user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// Mongo connection
const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/users";

mongoose
  .connect(MONGO_URL)
  .then(() => console.log(`Connected to MongoDB: ${MONGO_URL}`))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.send("Backend is running.");
});

// GET /users (all, by name, by job, by name+job)
app.get("/users", async (req, res) => {
  try {
    const { name, job } = req.query;

    let users;
    if (name && job) users = await findUsersByNameAndJob(name, job);
    else if (name) users = await findUsersByName(name);
    else if (job) users = await findUsersByJob(job);
    else users = await findAllUsers();

    res.json({ users_list: users });
  } catch (err) {
    console.error("GET /users error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /users/:id
app.get("/users/:id", async (req, res) => {
  try {
    const user = await findUserById(req.params.id);
    if (!user) return res.status(404).send("Resource not found.");
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: "Invalid id" });
  }
});

// POST /users
app.post("/users", async (req, res) => {
  try {
    const { name, job } = req.body;
    if (!name || !job) {
      return res.status(400).json({ error: "Missing required fields: name, job" });
    }
    const created = await createUser({ name, job });
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message || "Bad request" });
  }
});

// DELETE /users/:id
app.delete("/users/:id", async (req, res) => {
  try {
    const deleted = await deleteUserById(req.params.id);
    if (!deleted) return res.status(404).send("Resource not found.");
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: "Invalid id" });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
