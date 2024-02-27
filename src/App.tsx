import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faGear, faPlus } from "@fortawesome/free-solid-svg-icons";

interface Entry {
    date: Date;
    title: string;
    inputTypes: string[];
    entryKey: string;
}

const App: React.FC = () => {
    const [entryList, setEntryList] = useState<Entry[]>([]);
    const [selectedEntryKey, setSelectedEntryKey] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const handleNewEntry = () => {
        const addEntryPrompt = prompt("Task name");
        if (!addEntryPrompt) return;
        const newEntry: Entry = {
            title: addEntryPrompt,
            date: new Date(),
            inputTypes: [],
            entryKey: `${addEntryPrompt}_${Date.now()}`, // Using title and timestamp as the key
        };
        setEntryList([...entryList, newEntry]);
    };

    const handleSelectEntry = (entryKey: string) => {
        // return statement as to not unselect the entry on click
        if(selectedEntryKey === entryKey) return;

        setSelectedEntryKey(entryKey === selectedEntryKey ? null : entryKey);
    };

    const handleSettings = () => {
        // Handling settings logic here
    };

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
                    </div>
                    <div id="entry-list" className="half-container">
                        <div id="list-date-container">
                            <button id="previous-month">
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </button>
                            <p id="current-month" className="bold">
                                Month / Year
                            </p>
                            <button id="next-month">
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        </div>
                        {entryList.map((entry) => (
                            <div
                                key={entry.entryKey}
                                className={`list-entry-container entry-shorthand ${selectedEntryKey === entry.entryKey ? "selected" : ""}`}
                                onClick={() => handleSelectEntry(entry.entryKey)}
                            >
                                <div className="bold entry-shorthand-title">{entry.title}</div>
                                <div className="bold entry-shorthand-date">{`${entry.date.getMonth() + 1}/${entry.date.getDate()}`}</div>
                            </div>
                        ))}
                        <div id="add-entry-container" className="list-entry-container">
                            <button id="add-entry-btn" onClick={handleNewEntry} className="btn large-btn bold">
                                New Entry
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div id="edit-container">Haiii</div>
                </>
            )}
        </div>
    );
};

export default App;
