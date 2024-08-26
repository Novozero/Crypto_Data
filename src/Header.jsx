import { Button } from "react-bootstrap"



export default function Header({
    inputField,
    setInputField,
    onKeyDown,
    searchOnClick
}){
    return(
        <>
        <h1 className='display-2 bg-light-subtle d-flex justify-content-center'>Crypto Market</h1>
            <div className='d-flex justify-content-center my-4'>
                <label name="searchField">
            <input type="text" value={inputField} onChange={e => setInputField(e.target.value)} onKeyDown={onKeyDown}/>
                </label>
            <Button id='searchButton' type="button" className='btn btn-primary btn-sm' onClick={searchOnClick} >Search</Button>
            </div>
        </>
    )
}