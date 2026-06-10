const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let notes = [];
let nextId = 1;

app.post("/notes", (req, res) => {
    const { content } = req.body;

    const note = {
        id: nextId++,
        content: content || "",
        createdAt: new Date(),
    };

    notes.push(note);
    // console.log("Created note:", note);
    console.log('POST Note: ', note.id )

    res.status(201).json(note);
});

app.get("/notes", (req, res) => {
    console.log('GET Notes: All')
    res.json(notes);
});

app.get("/notes/:id", (req, res) => {
    const note = notes.find((n) => n.id === Number(req.params.id));
    console.log('GET Note: ', note.id)

    if (!note) {
        return res.status(404).json({ message: "Note not found" });
    }

    res.json(note);
});

app.put("/notes/:id", (req, res) => {
    const note = notes.find((n) => n.id === Number(req.params.id));

    if (!note) {
        return res.status(404).json({ message: "Note not found" });
    }

    note.content = req.body.content ?? note.content;
    note.updatedAt = new Date();

    console.log("PUT note: ", note.id);

    res.json(note);
});

app.delete("/notes/:id", (req, res) => {
    const noteIndex = notes.findIndex((n) => n.id === Number(req.params.id));

    if (noteIndex === -1) {
        return res.status(404).json({ message: "Note not found" });
    }

    const deletedNote = notes.splice(noteIndex, 1)[0];

    console.log("Deleted note:", noteIndex);

    res.json({ message: "Note deleted", note: deletedNote });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});