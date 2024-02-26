import { useState } from "react"
import Entry from "./components/Entry"
// import Input from "./components/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faGear, faPlus } from "@fortawesome/free-solid-svg-icons";


interface Entry{
    date: Date;
    title: string;
    inputTypes: string[];
}



const App = () => {

    const [entryList, setEntryList] = useState<Entry[]>([]);
    const [selectedEntry, setSelectedEntry] = useState<number>();
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const handleNewEntry = () => {

        // setIsEditing(true);

        const addEntryPrompt = prompt("Task name");
        if(!addEntryPrompt) return;
        setEntryList([...entryList, {title: addEntryPrompt, date: new Date(), inputTypes: []}])

    }
    
    const handleSaveEntry = (index: number) => {

        // entryList[index] = 

    }

    const handleSelectEntry = (index: number) => {
        setSelectedEntry(index);
    }

    return (
        <div id="app-container">
            <button id="settings-btn"><FontAwesomeIcon icon={faGear}></FontAwesomeIcon></button>
            {!isEditing ? (
                <>
                    <div id="open-entry" className="half-container">
                        <div id="selected-title" className="bold">{selectedEntry ? entryList[selectedEntry].title : 'Select an Entry'}</div>
                    </div>
                    <div id="entry-list" className="half-container">
                        <div id="list-date-container">
                            <button id="previous-month"><FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon></button>
                            <p id="current-month" className="bold">Month / Year</p>
                            <button id="next-month"><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></button>
                        </div>
                        {selectedEntry ? (
                            <FontAwesomeIcon id="select-arrow" icon={faArrowLeft}></FontAwesomeIcon>
                        ) : (``)
                        }
                        {entryList ? 
                        entryList.map((entry, index) => {
                            return (
                                <div className="list-entry-container entry-shorthand" onClick={() => {handleSelectEntry(index)}}>
                                    <div className="bold entry-shorthand-title">{entry.title}</div>
                                    <div className="bold entry-shorthand-date">{(entry.date.getMonth()+1) + `/` + entry.date.getDate()}</div>
                                </div>
                                )
                            }) : ''}
                        <div id="add-entry-container" className="list-entry-container">
                            <button id="add-entry-btn" onClick={() => {handleNewEntry()}} className="btn large-btn bold">New Entry</button>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div id="edit-container">
                        Haiii
                    </div>
                </>
            )}
        </div>
    )
}

export default App

