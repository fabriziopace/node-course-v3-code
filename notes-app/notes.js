const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => { return ('Your notes...') };

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);

        console.log(chalk.green.inverse('New note added.'));
    } else {
        console.log(chalk.red.inverse('Note already added.'));
    }

};

const removeNote = (title) => {
    const notes = loadNotes();

    const notesToKeep = notes.filter((note) => note.title !== title);

    if (notes.length === notesToKeep.length) {
        console.log(chalk.red.inverse('Note not found!'));
    } else {
        saveNotes(notesToKeep);
        console.log(chalk.green.inverse('Note ' + title + ' deleted!'));
    }
};

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
};

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.green.inverse('Your notes:'));
    notes.forEach((note) => {
        console.log(note.title);
    });
};

const readNote = (title) => {
    const notes = loadNotes();

    const noteToRead = notes.find((note) => note.title === title);

    if (noteToRead) {
        console.log(chalk.green.inverse('Title: ' + noteToRead.title));
        console.log(noteToRead.body);
    } else {
        console.log(chalk.inverse.red('No note found'));
    }

}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};