import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faGear } from "@fortawesome/free-solid-svg-icons";

interface Entry {
    date: Date;
    title: string;
    entryData: string[];
    entryKey: string;
}

const App: React.FC = () => {
    const [entryList, setEntryList] = useState<Entry[]>([]);
    const [selectedEntryKey, setSelectedEntryKey] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [gratitude, setGratitude] = useState<string>("");
    const [notes, setNotes] = useState<string>("");

    const entryListRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const storedEntries = localStorage.getItem('entries');
        if (storedEntries) {
            try {
                const parsedEntries: Entry[] = JSON.parse(storedEntries);
                parsedEntries.forEach(entry => {
                    entry.date = new Date(entry.date);
                });
                setEntryList(parsedEntries);
            } catch (error) {
                console.error('Error parsing stored entries:', error);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('entries', JSON.stringify(entryList));
    }, [entryList]);

    const handleNewEntry = () => {
        const addEntryPrompt = prompt("Task name");
        if (!addEntryPrompt) return;
        const newEntry: Entry = {
            title: addEntryPrompt,
            date: new Date(),
            entryData: [],
            entryKey: `${addEntryPrompt}_${Date.now()}`, // Using title and timestamp as the key
        };
        setEntryList([...entryList, newEntry]);
    };

    const handleSelectEntry = (entryKey: string) => {
        if (selectedEntryKey === entryKey) return;

        setSelectedEntryKey(entryKey);
        const selectedEntry = entryList.find(entry => entry.entryKey === entryKey);
        if (selectedEntry) {
            setGratitude(selectedEntry.entryData[0] || "");
            setNotes(selectedEntry.entryData[1] || "");
        }
    };

    const handleSaveEntry = () => {
        if (!selectedEntryKey) return;

        const updatedEntryList = entryList.map(entry => {
            if (entry.entryKey === selectedEntryKey) {
                return {
                    ...entry,
                    entryData: [gratitude, notes]
                };
            }
            return entry;
        });

        setEntryList(updatedEntryList);
    };

    const handleSettings = () => {
        setIsEditing(!isEditing);
    };

    const deleteStorage = () => {
        localStorage.clear();
        setSelectedEntryKey(null);
        setEntryList([]);
    }

document.addEventListener('mousemove', (event) => {
    const entryList = document.getElementById('entry-list');
    if (!entryList) return;

    const mouseX = event.pageX;
    const mouseY = event.pageY;

    const backgroundPosX = (mouseX / window.innerWidth) * 15;
    const backgroundPosY = (mouseY / window.innerHeight) * 15;

    entryList.style.backgroundPosition = `${backgroundPosX}% ${backgroundPosY}%`;
});


    return (
        <div id="app-container">
            <button id="settings-btn" onClick={handleSettings}>
                <FontAwesomeIcon icon={faGear} />
            </button>
            {!isEditing ? (
                <>
                    <div id="open-entry" className="half-container">
                        <div id="selected-title" className="bold">
                            {selectedEntryKey
                                ? entryList.find((entry) => entry.entryKey === selectedEntryKey)?.title || "Select an Entry"
                                : "Select an Entry"}
                        </div>
                        {selectedEntryKey && (
                            <>
                                <div id="gratitude-container" className="entry-text-container">
                                    <label htmlFor="gratitude" className="bold">Daily Gratitude</label>
                                    <textarea id="gratitude" value={gratitude} onChange={(e) => setGratitude(e.target.value)}></textarea>
                                </div>
                                <div id="notes-container" className="entry-text-container">
                                    <label htmlFor="notes" className="bold">Notes</label>
                                    <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
                                </div>
                            </>
                        )}
                        {selectedEntryKey && (
                            <button className="large-btn bold" id="entry-save-btn" onClick={handleSaveEntry}>Save</button>
                        )}
                    </div>
                    <div id="entry-list" className="half-container" ref={entryListRef}>
                        <div id="list-date-container">
                            <button id="previous-month">
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </button>
                            <p id="current-month" className="bold">
                                {new Date().toLocaleString('default', { month: 'long' })}
                            </p>
                            <button id="next-month">
                                <FontAwesomeIcon icon={faArrowRight} />
                            </button>
                        </div>
                        <div id="entry-list-container">
                            {entryList.map((entry) => (
                                <div key={entry.entryKey} className="entry-container">
                                        <FontAwesomeIcon className={`select-arrow ${selectedEntryKey === entry.entryKey ? '' : 'hidden'}`} icon={faArrowLeft}></FontAwesomeIcon>
                                    <div className={`list-entry-container entry-shorthand ${selectedEntryKey === entry.entryKey ? "selected" : ""}`}
                                        onClick={() => handleSelectEntry(entry.entryKey)}>
                                        <div className="bold entry-shorthand-title">{entry.title}</div>
                                        <div className="bold entry-shorthand-date">{`${entry.date.getMonth() + 1}/${entry.date.getDate()}`}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div id="add-entry-container" className="list-entry-container">
                            <button id="add-entry-btn" onClick={handleNewEntry} className="btn large-btn bold">
                                New Entry
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div id="edit-container">
                        <h1 className="bold" id="settings-title">Settings</h1>
                        <button id="delete-all-btn" className="large-btn bold" onClick={deleteStorage}>Delete All</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default App;
