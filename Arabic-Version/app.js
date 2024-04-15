const addButton = document.getElementById("add-button");

const notesWrapper = document.querySelector(".notes-wrapper");
const titleArea = document.getElementById("title-area");
const textArea = document.getElementById("text-area");

const article = document.querySelector("article");

const weekNames = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
const monthNames = ["يناير", "فبراير", "مارس", "أبريل", "ماي", "يونيو", "يوليوز", "غشت", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];

if (window.localStorage.getItem("notes-arabic") !== null) {
    notesWrapper.innerHTML = window.localStorage.getItem("notes-arabic");

    Array.from(notesWrapper.children).forEach(function (noteBox) {
        noteBox.addEventListener("click", function () {
            showNote(this);
        })
        noteBox.addEventListener("dblclick", deleteNote);
    })

    const activeNote = document.querySelector(".note.active");

    if (activeNote !== null) {
        showNote(activeNote);
    }


}

addButton.addEventListener("click", showNoteBox);

titleArea.addEventListener("blur", saveNote);
textArea.addEventListener("blur", saveNote);

function showNoteBox() {
    const noteBox = document.createElement("div");

    const date = new Date();

    const noteBoxContent = `
    <h2 class="note__title">ملاحظة جديدة</h2>
    <p class="note__extract">إكتب ملاحظة...</p>
    <span class="note__date">${date.toLocaleString("ar-EG", {
        dateStyle: "full",
        timeStyle: "short"
    })}</span>
  `


    noteBox.classList.add("note");

    noteBox.innerHTML = noteBoxContent;

    showNote(noteBox);

    noteBox.addEventListener("click", function () {
        showNote(this);
    });

    noteBox.addEventListener("dblclick", deleteNote);

    notesWrapper.prepend(noteBox);

}

function showNote(currentNote) {
    const activeNote = document.querySelector(".note.active");

    titleArea.value = currentNote.children[0].textContent;
    textArea.placeholder = "إكتب ملاحظة...";

    if (currentNote.children[1].textContent == "إكتب ملاحظة...") {
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
        activeNote.innerHTML = `
    <h2 class="note__title">${titleArea.value}</h2>
    <p class="note__extract">${textArea.value}</p>
    <span class="note__date">${date.toLocaleString("ar-EG", {
            dateStyle: "full",
            timeStyle: "short"
        })}</span>
    `;

        window.localStorage.setItem("notes-arabic", notesWrapper.innerHTML);

        notesWrapper.prepend(activeNote);

    }
}

function deleteNote() {
    if (confirm("هل تريد حقا حذف هذه الملاحظة")) {
        this.remove();
        window.localStorage.setItem("notes-arabic", notesWrapper.innerHTML);
        titleArea.value = "أضف ملاحظة للبدء";
        textArea.value = "";
    }
}