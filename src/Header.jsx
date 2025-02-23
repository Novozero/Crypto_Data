import { Button } from "react-bootstrap";
import './style.css';

export default function Header({
    handleKeyDown,
    inputField,
    setInputField,
    searchOnClick
}) {
    /**
     * Handles keydown events for search input
     * Behandelt Tastendruck-Ereignisse für das Suchfeld
     */
    function handleKeyDown(event) {
        if (event.key === "Enter") {
            searchOnClick(); // Trigger search when Enter is pressed
            // Suche auslösen, wenn Enter gedrückt wird
        }
        if (event.key === "Escape") {
            setInputField(""); // Clear input field when Escape is pressed
            // Eingabefeld leeren, wenn Escape gedrückt wird
        }
    }

    return (
        <>
            {/* Page heading */}
            {/* Seitenüberschrift */}
            <h1 id="h1Header" className='display-2 d-flex justify-content-center py-5'>
                Crypto-Screener
            </h1>

            {/* Search bar with input field and search button */}
            {/* Suchleiste mit Eingabefeld und Suchbutton */}
            <div className='d-flex justify-content-center my-4'>
                <label name="searchField">
                    <input
                        id="input"
                        type="text"
                        placeholder="Search..." // Placeholder text for input
                        // Platzhaltertext für das Eingabefeld
                        value={inputField}
                        onChange={e => setInputField(e.target.value)} // Update state on input change
                        // Zustand beim Ändern der Eingabe aktualisieren
                        onKeyDown={handleKeyDown} // Handle key events
                        // Tasteneingaben verarbeiten
                    />
                </label>
                <Button
                    id='searchButton'
                    type="button"
                    className='btn btn-sm ms-2'
                    onClick={searchOnClick} // Trigger search on button click
                    // Suche bei Button-Klick auslösen
                >
                    Search
                </Button>
            </div>
        </>
    );
}
