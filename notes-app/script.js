const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
    notes.forEach((note) => {
        addNewNote(note);
    });
}

document.getElementById("add").addEventListener("click", () => {
    addNewNote();
});

function addNewNote(text = "") {
    const note = document.createElement("div");

    note.classList.add("note");
    note.innerHTML = `
        <div class="tools">
            <button class="delete"><i class="fas fa-trash-alt"></i></button>
        </div>
        <textarea></textarea>
    `;

    const textArea = note.querySelector("textarea");
    textArea.value = text;

    textArea.addEventListener("input", (e) => {
        updateLS();
    });

    note.querySelector(".delete").addEventListener("click", () => {
        note.remove();
        updateLS();
    });

    document.body.appendChild(note);
}

function updateLS() {
    const notesText = document.querySelectorAll("textarea"),
        notes = [];

    notesText.forEach((note) => {
        notes.push(note.value);
    });

    localStorage.setItem("notes", JSON.stringify(notes));
}
