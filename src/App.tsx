import { useState } from "react"
import Entry from "./components/Entry"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";


interface Entry{
    date: Date;
    title: string;
}

const App = () => {

    const [entryList, setEntryList] = useState<Entry[]>([{title: "Hello", date: new Date()}]);

    return (
        <div id="app-container">
            <div id="open-entry" className="half-container">Open Entry</div>
            <div id="entry-list" className="half-container">
                <div id="list-date-container">
                    <button id="previous-month"><FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon></button>
                    <p id="current-month">Month / Year</p>
                    <button id="next-month"><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></button>
                </div>
                {entryList ? 
                    entryList.map((entry) => {
                        return (
                            <Entry key={entry.title} title={entry.title}/>
                        )
                    }) : ''}
                <div id="add-entry-container">
                    <button id="add-entry-btn" className="btn">New Entry</button>
                </div>
            </div>
        </div>
    )
}

export default App