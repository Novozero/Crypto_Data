import { Button } from "react-bootstrap"
import './style.css';



export default function Header({
    inputField,
    setInputField,
    onKeyDown,
    searchOnClick
}){
    return(
        <>
        <h1 id="h1Header" className='display-2 d-flex justify-content-center py-5'>Crypto-Screener</h1>
            <div className='d-flex justify-content-center my-4'>
                <label name="searchField">
            <input
            id="input" type="text" placeholder="Search..." value={inputField} onChange={e => setInputField(e.target.value)} onKeyDown={onKeyDown}/>
                </label>
            <Button id='searchButton' type="button" className='btn btn-sm ms-2' onClick={searchOnClick} >Search</Button>
            </div>
        </>
    )
}