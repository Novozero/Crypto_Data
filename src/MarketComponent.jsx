import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import Dropdown from 'react-bootstrap/Dropdown';
import PercentButton from './PercentButton';
import Header from './Header';

export default function CryptoScreener() {
    // State variables for handling crypto data and UI states
    // State-Variablen zur Verwaltung der Krypto-Daten und UI-Zustände
    const [cryptoData, setCryptoData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [perPage, setPerPage] = useState(50);
    const [togglePercent, setTogglePercent] = useState(false);
    const [filtered, setFiltered] = useState([]);
    const [inputField, setInputField] = useState("");
    
    /** 
     * Search function to filter crypto data by name
     * Suchfunktion zur Filterung der Krypto-Daten nach Namen
     */
    function searchOnClick() {
        if (inputField === "") {
            return setFiltered(cryptoData);
        } else {
            const strictData = cryptoData.filter(coin => coin.name.toLowerCase() === inputField.toLowerCase());

            if (strictData.length > 0) {
                setFiltered(strictData);
            } else {
                const looseData = cryptoData.filter(coin => coin.name.toLowerCase().includes(inputField.toLowerCase()));
                setFiltered(looseData);
            }
        }
    }
    
    /** 
     * Event handler for Enter and Escape keys
     * Event-Handler für Enter- und Escape-Tasten
     */
    function handleKeyDown(event) {
        if (event.key === "Enter") {
            searchOnClick();
        }
        if (event.key === "Escape") {
            setInputField("");
        }
    }

    /** 
     * Formats decimal places for prices
     * Formatiert Dezimalstellen für Preise
     */
    function fixDecimal(price) {
        if (price !== null && price !== undefined && !isNaN(price)) {
            return Math.abs(price) >= 0.01 ? price.toFixed(2) : price.toFixed(8);
        } else {
            return 'N/A';
        }
    }

    /** 
     * Calculates percentage change based on price
     * Berechnet die prozentuale Veränderung basierend auf dem Preis
     */
    function changeInPercent(changeIn24H, basePrice) {
        let sum = (changeIn24H / basePrice) * 100;
        return sum < 0.01 ? Math.abs(sum.toFixed(2)) : Math.abs(sum);
    }

    /** 
     * Determines the price style based on positive or negative change
     * Bestimmt den Preisstil basierend auf positiver oder negativer Veränderung
     */
    function priceStyle(price_change_24h) {
        if (price_change_24h > 0) {
            return {
                style: { color: "green" }, 
                text: `▲ ${fixDecimal(price_change_24h)}`
            };
        } else {
            return {
                style: { color: "red" },
                text: `▼ ${fixDecimal(price_change_24h)}`
            };
        }
    }

    /** 
     * Toggles between dollar and percentage view
     * Wechselt zwischen Dollar- und Prozentansicht
     */
    function changeToPercent() {
        setTogglePercent(toggle => !toggle);
    }

    /** 
     * Fetches cryptocurrency market data from CoinGecko API
     * Ruft Marktdaten für Kryptowährungen von der CoinGecko-API ab
     */
    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/coins/markets', {
            params: {
                vs_currency: 'usd',
                order: 'market_cap_desc',
                per_page: perPage,
                sparkline: false,
                price_change_percentage: '1h'
            }
        })
        .then(response => {
            setCryptoData(response.data);
            setLoading(false);
        })
        .catch(error => {
            setError(error);
            setLoading(false);
        });
    }, [perPage]);

    // Display loading and error messages
    // Anzeige von Lade- und Fehlermeldungen
    if (loading) {
        return <div>Is loading...</div>;
    }
    if (error) {
        return <div>Error {error.message}</div>;
    }

    return (
        <>
            <div id='background'></div>
            <div>
                <Header 
                    searchOnClick={searchOnClick} 
                    setInputField={setInputField} 
                    inputField={inputField} 
                    handleKeyDown={handleKeyDown} 
                />
                
                <Dropdown onSelect={(eventKey) => setPerPage(Number(eventKey))} className='mx-3 mb-3'>
                    <Dropdown.Toggle variant="primary">Filter Top Coins</Dropdown.Toggle>
                    <DropdownMenu>
                        <DropdownItem eventKey={50}>Top 50</DropdownItem>
                        <DropdownItem eventKey={25}>Top 25</DropdownItem>
                        <DropdownItem eventKey={10}>Top 10</DropdownItem>
                        <DropdownItem eventKey={5}>Top 5</DropdownItem>
                    </DropdownMenu>
                    <PercentButton onClick={changeToPercent} percentToDollar={togglePercent} />
                </Dropdown>
                
                <div className='m-3'>  
                    <Table striped hover responsive="sm">
                        <thead>
                            <tr>
                                <th>Icon</th>
                                <th>Name</th>
                                <th>Symbol</th>
                                <th>Price</th>
                                <th>24H Change</th>
                                <th className='hideMobile'>Market Cap</th>
                                <th className='hideMobile'>Volume</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(filtered.length > 0 ? filtered : cryptoData).map(coin => (
                                <tr key={coin.id}>
                                    <td>
                                        <img src={coin.image} alt={coin.name} style={{ width: "32px", height: "32px" }} />
                                    </td>
                                    <td>{coin.name}</td>
                                    <td>{coin.symbol.toUpperCase()}</td>
                                    <td>${fixDecimal(coin.current_price)}</td>
                                    <td style={priceStyle(coin.price_change_24h).style}>
                                        {togglePercent 
                                            ? `${priceStyle(coin.price_change_24h).text}$` 
                                            : `${priceStyle(changeInPercent(coin.price_change_24h, coin.current_price)).text}%`
                                        }
                                    </td>
                                    <td className='hideMobile'>${coin.market_cap.toLocaleString()}</td>
                                    <td className='hideMobile'>${coin.total_volume.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    );
}
