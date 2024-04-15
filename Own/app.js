const addButton = document.getElementById("add-button");
const titleArea = document.getElementById("title-area");
const textArea = document.getElementById("text-area");
const article = document.querySelector("article");
const notesWrapper = document.querySelector(".notes-wrapper");

const weekNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

if (window.localStorage.getItem("notes") !== null) {
  notesWrapper.innerHTML = window.localStorage.getItem("notes");
  Array.from(notesWrapper.children).forEach(function (note) {
    note.onclick = function () {
      showNote(note);
    };
  })
}

addButton.onclick = showNoteBox;

titleArea.onblur = saveNote;
textArea.onblur = saveNote;

function showNoteBox() {
  const noteBox = document.createElement("div");
  const heading = document.createElement("h2");
  const extract = document.createElement("p");
  const noteDate = document.createElement("span");

  const date = new Date();

  noteBox.classList.add("note");
  heading.classList.add("note__heading");
  extract.classList.add("note__extract");
  noteDate.classList.add("note__date");

  heading.textContent = "New Note";
  extract.textContent = "Take note...";
  noteDate.textContent = `${weekNames[date.getDay()]}, ${date.getDate()} ${monthNames[date.getDate()]} ${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`;

  noteBox.appendChild(heading);
  noteBox.appendChild(extract);
  noteBox.appendChild(noteDate);

  showNote(noteBox);

  noteBox.onclick = function () {
    showNote(noteBox);
  };

  notesWrapper.prepend(noteBox);

}

function showNote(currentNote) {
  const activeNote = document.querySelector(".note.active");

  titleArea.value = currentNote.children[0].textContent;

  if (currentNote.children[1].textContent == "Take note...") {
    textArea.value = "";
  } else {
    textArea.value = currentNote.children[1].textContent;
  }

  if (activeNote !== null) activeNote.classList.remove("active");

  currentNote.classList.add("active");
}

function saveNote() {
  const activeNote = document.querySelector(".note.active");
  const date = new Date();

  if (activeNote !== null) {
    activeNote.children[0].textContent = titleArea.value;
    activeNote.children[1].textContent = textArea.value;
    activeNote.children[2].textContent = `${weekNames[date.getDay()]}, ${date.getDate()} ${monthNames[date.getDate()]} ${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`;

    window.localStorage.setItem("notes", notesWrapper.innerHTML);

  }
}