const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
  const notes = loadNotes();

  const duplicateNote = notes.find(
    (note) => note.title.toLowerCase() === title.toLowerCase()
  );

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });

    saveNotes(notes);
    console.log(chalk.green.inverse("New note added"));
  } else {
    console.log(chalk.red.inverse("Note title taken!"));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter(
    (note) => note.title.toLowerCase() !== title.toLowerCase()
  );

  if (notesToKeep.length === notes.length) {
    console.log(chalk.red.inverse("That note does not exist!"));
  } else {
    console.log(chalk.green.inverse("Note deleted"));
    saveNotes(notesToKeep);
  }
};

const saveNotes = function (notes) {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const listNotes = () => {
  const notes = loadNotes();
  notes.forEach((note) => {
    console.log(chalk.inverse(note.title));
    console.log(note.body);
    console.log("---------");
  });
};

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find(
    (note) => note.title.toLowerCase() === title.toLowerCase()
  );

  if (note) {
    console.log(chalk.blue.inverse(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.red.inverse("There is no such note"));
  }
};

module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNote,
};
