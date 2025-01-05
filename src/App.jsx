import HeaderComponent from "./components/Header.Jsx"
import Entry from "./components/Entry.jsx"
import data from "/data.js"



function App() {
    const entryElements = data.map((journalEntry) => {
        return (
            <Entry
                key={journalEntry.id}
                entry={journalEntry}
            />)
    })
    return (
        <>
            <HeaderComponent />
            {entryElements}
        </>
    )
}
export default App

