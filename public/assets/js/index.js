let noteTitle, noteText, saveNoteBtn, newNoteBtn, noteList;
const activeNote = {};

const isNotesPage = window.location.pathname === '/notes';

if (isNotesPage) {
  noteTitle = document.querySelector('.note-title');
  noteText = document.querySelector('.note-textarea');
  saveNoteBtn = document.querySelector('.save-note');
  newNoteBtn = document.querySelector('.new-note');
  noteList = document.querySelector('.list-container .list-group');
}

// Helper to show or hide an element
const toggleDisplay = (elem, shouldShow) => {
  elem.style.display = shouldShow ? 'inline' : 'none';
};

// Fetch all notes from the server
const getNotes = () =>
  fetch('/api/notes', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

// Save a new note to the server
const saveNote = (note) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  });

// Delete a note from the server by ID
const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

// Render the currently active note in the textarea
const renderActiveNote = () => {
  const isReadOnly = !!activeNote.id;
  noteTitle.readOnly = isReadOnly;
  noteText.readOnly = isReadOnly;
  noteTitle.value = activeNote.title || '';
  noteText.value = activeNote.text || '';
  toggleDisplay(saveNoteBtn, !isReadOnly);
};

// Handle saving a new note
const handleNoteSave = () => {
  const newNote = {
    title: noteTitle.value,
    text: noteText.value,
  };
  saveNote(newNote).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Handle deleting a note
const handleNoteDelete = (e) => {
  e.stopPropagation();
  const noteId = JSON.parse(e.target.closest('li').dataset.note).id;
  if (activeNote.id === noteId) activeNote.id = undefined;

  deleteNote(noteId).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Handle viewing a note
const handleNoteView = (e) => {
  e.preventDefault();
  activeNote.id = JSON.parse(e.target.closest('li').dataset.note).id;
  renderActiveNote();
};

// Handle switching to a new note
const handleNewNoteView = () => {
  activeNote.id = undefined;
  renderActiveNote();
};

// Enable or disable the save button based on input
const handleRenderSaveBtn = () => {
  const shouldEnableSave = noteTitle.value.trim() && noteText.value.trim();
  toggleDisplay(saveNoteBtn, shouldEnableSave);
};

// Create a list item element for the note
const createListItem = (text, delBtn = true) => {
  const liEl = document.createElement('li');
  liEl.classList.add('list-group-item');

  const spanEl = document.createElement('span');
  spanEl.classList.add('list-item-title');
  spanEl.innerText = text;
  spanEl.addEventListener('click', handleNoteView);

  liEl.appendChild(spanEl);

  if (delBtn) {
    const delBtnEl = document.createElement('i');
    delBtnEl.classList.add('fas', 'fa-trash-alt', 'float-right', 'text-danger', 'delete-note');
    delBtnEl.addEventListener('click', handleNoteDelete);
    liEl.appendChild(delBtnEl);
  }

  return liEl;
};

// Render the list of note titles
const renderNoteList = async (notes) => {
  const jsonNotes = await notes.json();
  noteList.innerHTML = '';

  const noteListItems = jsonNotes.length
    ? jsonNotes.map((note) => {
        const li = createListItem(note.title);
        li.dataset.note = JSON.stringify(note);
        return li;
      })
    : [createListItem('No saved Notes', false)];

  noteListItems.forEach((note) => noteList.appendChild(note));
};

// Get and render the notes from the server
const getAndRenderNotes = () => getNotes().then(renderNoteList);

// Add event listeners
if (isNotesPage) {
  saveNoteBtn.addEventListener('click', handleNoteSave);
  newNoteBtn.addEventListener('click', handleNewNoteView);
  noteTitle.addEventListener('keyup', handleRenderSaveBtn);
  noteText.addEventListener('keyup', handleRenderSaveBtn);
  getAndRenderNotes();
}
