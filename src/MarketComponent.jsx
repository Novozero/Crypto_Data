import { useState, useEffect } from 'react'
import Table from 'react-bootstrap/table'
import axios from 'axios'
import Button from 'react-bootstrap/button'
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu'
import DropdownItem from 'react-bootstrap/esm/DropdownItem'
import Dropdown from 'react-bootstrap/Dropdown'


export default function CryptoScreener() {
    
    const [cryptoData, setCryptoData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [perPage, setPerPage] = useState(50)
    
    const [filtered, setFiltered] = useState([])
    const [inputField, setInputField] = useState("")

    function searchOnClick() {
        if (inputField === "") {
            return setFiltered(cryptoData);
        } else {
            const strictData = cryptoData.filter(coin => coin.name.toLowerCase() === inputField.toLowerCase());
    
            if (strictData.length > 0) {
                setFiltered(strictData);
            } else {
                const loseData = cryptoData.filter(coin => coin.name.toLowerCase().includes(inputField.toLowerCase()));
                setFiltered(loseData);
            }
        }
    }
    
    function handleKeyDown(event){
        if(event.key === "Enter"){
            searchOnClick()
        }
        if(event.key === "Escape"){
            setInputField("")
        }
    }



    useEffect(() =>{
        axios.get('https://api.coingecko.com/api/v3/coins/markets', {
            params: {
                vs_currency: 'usd',
                order: 'market_cap_desc',
                per_page: perPage,
                sparkline: false,
                price_change_percentage: '1h'
            }
        })
        .then(response=>{
            setCryptoData(response.data)
            setLoading(false)
        })
        .catch(error =>{
            setError(error)
            setLoading(false)
        })
    },[perPage]);


    

    if(loading){
        return <div>Is loading...</div>
    }
    if(error){
        return <div>Error {error.message}</div>
    }
    return(
        <>
        <div>
            <h1 className='display-2 bg-light-subtle d-flex justify-content-center'>Crypto Market</h1>
            <div className='d-flex justify-content-center my-4'>
                <label name="searchField">
            <input type="text" value={inputField} onChange={e => setInputField(e.target.value)} onKeyDown={handleKeyDown}/>
                </label>
            <Button id='searchButton' type="button" className='btn btn-primary btn-sm' onClick={searchOnClick} >Search</Button>
            </div>
        <Dropdown onSelect={(eventKey) => setPerPage(Number(eventKey))} className='mx-3 mb-3'>
            <Dropdown.Toggle variant="primary">Filter Top Coins</Dropdown.Toggle>
            <DropdownMenu>
                <DropdownItem eventKey={50}>Top 50</DropdownItem>
                <DropdownItem eventKey={25}>Top 25</DropdownItem>
                <DropdownItem eventKey={10}>Top 10</DropdownItem>
                <DropdownItem eventKey={5}>Top 5</DropdownItem>
            </DropdownMenu>
        </Dropdown>

            <div className='mx-3 border border-grey rounded-2 border-2'>  
            <Table striped hover responsive="sm">
                <thead>
                <tr>
                    <th>Icon</th>
                    <th>Name</th>
                    <th>Symbol</th>
                    <th>Price</th>
                    <th>Market Cap</th>
                    <th>Volume</th>
                </tr>
                </thead>
                <tbody>
                    {
                        (filtered.length > 0 ? filtered: cryptoData).map(coin => (
                            <tr key={coin.id}>
                                <td><img src={coin.image} alt="coin.name" style={{width: "32px", height: "32px"}} /></td>
                                <td>{coin.name}</td>
                                <td>{coin.symbol.toUpperCase()}</td>
                                <td>${coin.current_price.toLocaleString()}</td>
                                <td>${coin.market_cap.toLocaleString()}</td>
                                <td>${coin.total_volume.toLocaleString()}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
        </div>
        </>
    )
}