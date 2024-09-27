const express = require("express");
const { PrismaClient } = require("@prisma/client");
const app = express();

const PORT = 3000;
app.use(express.json());
const prisma = new PrismaClient();

app.listen(PORT, () => {
  console.log("Server is running on port: ", PORT);
});

app.get("/api", (req, res) => {
  res.send("Workshop Coder123");
});

app.get("/notes", async (req, res) => {
  const notes = await prisma.notes.findMany();

  res.status(200).send({
    data: notes,
    message: "get all notes success",
  });
});

app.post("/notes", async (req, res) => {
  const newNoteData = req.body;

  const newNotes = await prisma.notes.create({
    data: {
      title: newNoteData.title,
      description: newNoteData.description,
      category: newNoteData.category,
    },
  });

  res.status(201).send({
    data: newNotes,
    message: "create notes successfully",
  });
});

app.patch("/notes/:id", async (req, res) => {
  const noteId = req.params.id;
  const newNoteData = req.body;

  const notes = await prisma.notes.update({
    where: {
      id: parseInt(noteId),
    },
    data: {
      title: newNoteData.title,
      description: newNoteData.description,
      category: newNoteData.category,
    },
  });

  res.status(201).send({
    data: notes,
    message: "update data successful",
  });
});

app.put("/notes/:id", async (req, res) => {
  const noteId = req.params.id;
  const newNoteData = req.body;

  if (!newNoteData.title || !newNoteData.description || !newNoteData.category) {
    return res.status(400).send("invalid input data");
  }

  const notes = await prisma.notes.update({
    where: {
      id: parseInt(noteId),
    },
    data: {
      title: newNoteData.title,
      description: newNoteData.description,
      category: newNoteData.category,
    },
  });

  res.status(201).send({
    data: notes,
    message: "update data successful",
  });
});

app.delete("/notes/:id", async (req, res) => {
  const noteId = req.params.id;
  await prisma.notes.delete({
    where: {
      id: parseInt(noteId),
    },
  });

  res.status(200).send("delete note successful!");
});
