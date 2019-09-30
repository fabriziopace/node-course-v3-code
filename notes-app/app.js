const yargs = require("yargs");
const notes = require("./notes.js");

// Add command
yargs.command({
    command: "add",
    describe: "Add new note",
    builder: {
        title: {
            describe: "Note Title",
            demandOption: true,
            type: "string"
        },
        body: {
            describe: "Note Body",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) { notes.addNote(argv.title, argv.body) }
});

// Remove command
yargs.command({
    command: "remove",
    describe: "Remove note",
    builder: {
        title: {
            describe: "Note Title to Delete",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) { notes.removeNote(argv.title) }
});

// List command
yargs.command({
    command: "list",
    describe: "List of notes",
    handler() { notes.listNotes() }
});

// Read command
yargs.command({
    command: "read",
    describe: "Read a note",
    builder: {
        title: {
            describe: 'Note Title to Read',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) { notes.readNote(argv.title) }
});

yargs.parse();