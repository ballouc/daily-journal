import { useState } from "react"
import Entry from "./components/Entry"
// import Input from "./components/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";


interface Entry{
    date: Date;
    title: string;
    inputTypes: string[];
}



const App = () => {

    const [entryList, setEntryList] = useState<Entry[]>([]);

    const [selectedEntry, setSelectedEntry] = useState<Entry>(entryList[0]);
    // const [entryInputs, setEntryInputs] = useState<Input[]>([{title: 'Daily Gratitude', type: 'text-sm', value: ''}, {title: 'Notes', type: 'text-lg', value: ''}]);

    // Pass the individual array by index
    // ["checkbox (title)", "checkbox (title)", "text (value) (title)"], ["textarea"], ["text", "text", "checkbox"]
    // checkbox { title: "Drink Water",  type: "checkbox"}
    // text { title: , value: , type: "text"}

    const handleNewEntry = () => {
        const addEntryPrompt = prompt("Task name");
        if(!addEntryPrompt) return;
        setEntryList([...entryList, {title: addEntryPrompt, date: new Date(), inputTypes: []}])
    }

    return (
        <div id="app-container">
            <div id="open-entry" className="half-container">
                <div id="selected-title" className="bold">{selectedEntry ? selectedEntry.title : 'Select an Entry'}</div>
            </div>
            <div id="entry-list" className="half-container">
                <div id="list-date-container">
                    <button id="previous-month"><FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon></button>
                    <p id="current-month" className="bold">Month / Year</p>
                    <button id="next-month"><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></button>
                </div>
                {entryList ? 
                    entryList.map((entry, index) => {
                        return (
                            <Entry key={entry.title} title={entry.title}/>
                        )
                    }) : ''}
                <div id="add-entry-container">
                    <button id="add-entry-btn" onClick={() => {handleNewEntry()}} className="btn">New Entry</button>
                </div>
            </div>
        </div>
    )
}

export default App