# Note Taker

## Description

The Note Taker application is a simple note-taking tool that allows users to write, save, and delete notes. This application is designed to help small business owners or any user organize their thoughts and keep track of tasks. It uses an Express.js back end to handle data saving and retrieval from a JSON file. The front end is already created, and the main focus of this project is building the back end to connect with the existing user interface.

## User Story

**AS A** small business owner  
**I WANT** to be able to write and save notes  
**SO THAT** I can organize my thoughts and keep track of tasks I need to complete  

## Acceptance Criteria

- **GIVEN** a note-taking application
  - **WHEN** I open the Note Taker  
    **THEN** I am presented with a landing page with a link to a notes page.
  - **WHEN** I click on the link to the notes page  
    **THEN** I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and text.
  - **WHEN** I enter a new note title and the note’s text  
    **THEN** a "Save Note" button and a "Clear Form" button appear in the navigation.
  - **WHEN** I click on the Save button  
    **THEN** the new note I have entered is saved and appears in the left-hand column with other existing notes.
  - **WHEN** I click on an existing note in the list  
    **THEN** that note appears in the right-hand column for viewing or editing.
  - **WHEN** I click on the "New Note" button  
    **THEN** I am presented with empty fields to enter a new note title and text.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/note-taker.git
   cd note-taker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   npm start
   ```

## Usage

Once the application is running, open your browser and go to `http://localhost:3000`. The landing page will be displayed, and you can navigate to the notes page to start creating, saving, and deleting notes.

- Click "New Note" to create a new note.
- Enter a title and the body text of your note.
- Click the "Save Note" button to save your note.
- Click any existing note in the list to view or edit it.
- You can also delete notes by clicking the trash icon next to each note.

## Deployed Link

[Deployed Link](https://note-taker-0bei.onrender.com)

## API Routes

The following API routes are used in the application:

- `GET /api/notes` - Fetches all the saved notes from the `db.json` file.
- `POST /api/notes` - Saves a new note to the `db.json` file. Each note is assigned a unique ID.
- `DELETE /api/notes/:id` - Deletes a note with the specified ID from the `db.json` file.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.