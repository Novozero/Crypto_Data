import { Button } from "react-bootstrap"
import './style.css';


export default function Header({
    handleKeyDown,
    inputField,
    setInputField,
    searchOnClick
}){

    function handleKeyDown(event) {
        if (event.key === "Enter") {
          searchOnClick();
        }
        if (event.key === "Escape") {
          setInputField("");
        }
      }

    return(
        <>
        <h1 id="h1Header" className='display-2 d-flex justify-content-center py-5'>Crypto-Screener</h1>

            <div className='d-flex justify-content-center my-4'>
                <label name="searchField">
            <input
            id="input" type="text" placeholder="Search..." value={inputField} onChange={e => setInputField(e.target.value)} onKeyDown={handleKeyDown}/>
                </label>
            <Button id='searchButton' type="button" className='btn btn-sm ms-2' onClick={searchOnClick} >Search</Button>
            </div>
        </>
    )
}