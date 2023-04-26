class MoodEntry {
    constructor(date, mood, journalEntry) {
        this.date = date;
        this.mood = mood;
        this.journalEntry = journalEntry;
    }
}

const entryDateInput = document.getElementById('entryDate');
const moodSelector = document.getElementById('mood');
const journalEntryInput = document.getElementById('journalEntry');
const saveButton = document.getElementById('saveEntry');
const savedEntriesList = document.getElementById('savedEntriesList');

entryDateInput.valueAsDate = new Date();

entryDateInput.addEventListener('change', () => {
    const selectedDate = entryDateInput.value;
    const storedMood = localStorage.getItem(selectedDate);
    if (storedMood) {
        const moodEntry = JSON.parse(storedMood);
        moodSelector.value = moodEntry.mood;
        journalEntryInput.value = moodEntry.journalEntry;
    } else {
        moodSelector.value = '';
        journalEntryInput.value = '';
    }
    displaySavedEntries();
});

saveButton.addEventListener('click', () => {
    console.log('Save button clicked');
    const selectedDate = entryDateInput.value;
    const mood = moodSelector.value;
    const journalEntry = journalEntryInput.value;

    const moodEntry = new MoodEntry(selectedDate, mood, journalEntry);
    localStorage.setItem(selectedDate, JSON.stringify(moodEntry));
    displaySavedEntries();
});

function displaySavedEntries() {
    savedEntriesList.innerHTML = '';

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const storedMood = localStorage.getItem(key);
        const moodEntry = JSON.parse(storedMood);

        const entryItem = document.createElement('li');
        entryItem.classList.add('entryItem');

        const entryDate = document.createElement('h3');
        entryDate.textContent = moodEntry.date;
        entryItem.appendChild(entryDate);

        const entryMood = document.createElement('p');
        entryMood.textContent = `Mood: ${moodSelector.options[moodEntry.mood - 1].text}`;
        entryItem.appendChild(entryMood);

        const entryJournal = document.createElement('p');
        entryJournal.textContent = `Journal Entry: ${moodEntry.journalEntry}`;
        entryItem.appendChild(entryJournal);

        savedEntriesList.appendChild(entryItem);
    }
}

displaySavedEntries();

if (typeof(Storage) === "undefined") {
    alert("Your browser does not support local storage. Please use a modern browser to use this app.");
}
