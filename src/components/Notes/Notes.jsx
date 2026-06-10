import React, { useState, useEffect } from "react";
import './Notes.css'

const Notes = () => {
    const [note, setNote] = useState("");
    const [notes, setNotes] = useState([]);

    const [editMode, setEditMode] = useState(false);

    const [editNoteId, setEditNoteId] = useState(null);
    const [editingNoteContent, setEditingNoteContent] = useState("");


    const [searchNoteId, setSearchNoteId] = useState("");
    const [activeNote, setActiveNote] = useState(null)

    const addNote = async (e) => {
        e.preventDefault();

        if (!note.trim()) return;


        const res = await fetch("http://localhost:5000/notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content: note,
            }),
        });

        const data = await res.json();

        getNotes()
        setNote("");
    };



    const getNotes = async () => {
        const res = await fetch("http://localhost:5000/notes");

        const data = await res.json();
        setNotes(data);
        setActiveNote(null);
        setEditNoteId(null)
    };

    const getNote = async (e, id) => {
        e.preventDefault();

        if (!searchNoteId.trim()) return;

        const res = await fetch(`http://localhost:5000/notes/${id}`);

        const data = await res.json();
        setActiveNote(data)

    };

    const deleteNote = async (id) => {
        try {
            await fetch(`http://localhost:5000/notes/${id}`, {
            method: "DELETE",
        });

        setNotes((prevNotes) =>
            prevNotes.filter((note) => note.id !== id)
        );

        } catch (error) {
            console.error("Failed to delete note:", error);
        }
    };

    const updateNote = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/notes/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: editingNoteContent,
                }),
            });

            const updatedNote = await res.json();

            setNotes((prevNotes) =>
                prevNotes.map((note) =>
                    note.id === id ? updatedNote : note
                )
            );
        } catch (error) {
            console.error("Failed to update note:", error);
        }
    };

    const handleEdit = async (id) => {
        setEditMode(!editMode); 
        setEditNoteId(editMode ? null : id);
        if (editMode) {
            updateNote(id);
            getNotes();
        }
        
    }

    useEffect(() => {
        getNotes();
    }, []);

    return (
    <div className="notes">
        <h3>Notes</h3>
        <form onSubmit={addNote}>
        <input
            type="text"
            placeholder="Enter a note..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
        />
        <button type="submit">Add Note</button>
        </form>

        <ul>
        {notes.map((n, index) => (
            <li key={index} className="note">
                <div className="note-title">Note #{n.id}</div>
                {
                    editMode && n.id === editNoteId ?
                    <textarea 
                        className="edit-textarea"
                        value={editingNoteContent}
                        onChange={(e) => setEditingNoteContent(e.target.value)}>
                    </textarea>
                    :
                    <div className="note-content">{n.content}</div>
                }
                <div className="edit-section">
                    <div className="edit-btn" onClick={() => handleEdit(n.id)}>{editMode && n.id === editNoteId ? 'Save' : 'Edit'}</div>
                    <div className="delete-btn" onClick={() => deleteNote(n.id)}>Remove</div>
                </div>
            </li>
        ))}
        </ul>

        <h3>Read Note</h3>
        <form onSubmit={(e) => getNote(e, searchNoteId)}>
        <input
            type="text"
            placeholder="Enter a note ID..."
            value={searchNoteId}
            onChange={(e) => setSearchNoteId(e.target.value)}
        />
        <button type="submit">Find Note</button>
        </form>
        {
            activeNote ?
                <div className="note">
                    <div className="note-title">Note #{activeNote.id}</div>
                    <div className="note-content">{activeNote.content}</div>
                </div>
            :
            null
        }
    </div>
    );
}
export default Notes;