export default class Module {
  static getAllNotes() {
    const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");

    return notes.sort((a, b) => new Date(a.updated) > new Date(b.updated) ? -1 : 1);
  }

  static saveNote(noteToSave) {
    const notes = Module.getAllNotes();
    const existing = notes.find((note) => note.id == noteToSave.id);

    if (existing) {
      existing.title = noteToSave.title;
      existing.body = noteToSave.body;
    } else {
      notes.push(noteToSave);
      noteToSave.id = Math.floor(Math.random() * 1_000_000);
      noteToSave.updated = new Date().toISOString();
    }

    localStorage.setItem("notesapp-notes", JSON.stringify(notes));
  }

  static deleteNote(id) {
    const notes = Module.getAllNotes();
    const newNotes = notes.filter((note) => note.id != id);

    localStorage.setItem("notesapp-notes", JSON.stringify(newNotes));
  }
}