import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import Dropdown from 'react-bootstrap/Dropdown';
import PercentButton from './PercentButton';
import Header from './Header';
import {
  handleKeyDown,
  fixDecimal,
  changeInPercent,
  priceStyle,
  fixMarketCapVolume,
} from './priceFunctions';

export default function CryptoScreener() {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [perPage, setPerPage] = useState(50);
  const [togglePercent, setTogglePercent] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [inputField, setInputField] = useState("");

  useEffect(() => {
    axios
      .get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: perPage,
          sparkline: false,
          price_change_percentage: '1h',
        },
      })
      .then((response) => {
        setCryptoData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [perPage]);

  if (loading) {
    return <div>Is loading...</div>;
  }
  if (error) {
    return <div>Error {error.message}</div>;
  }

  function changeToPercent() {
    setTogglePercent((toggle) => !toggle);
  }

  function searchOnClick() {
    if (inputField === "") {
      return setFiltered(cryptoData);
    } else {
      const strictData = cryptoData.filter(
        (coin) => coin.name.toLowerCase() === inputField.toLowerCase()
      );

      if (strictData.length > 0) {
        setFiltered(strictData);
      } else {
        const loseData = cryptoData.filter(
          (coin) => coin.name.toLowerCase().includes(inputField.toLowerCase())
        );
        setFiltered(loseData);
      }
    }
  }

  return (
    <>
      <div id="backgroundContainer">
        <div id="mainContainer">
          <Header
            inputField={inputField}
            setInputField={setInputField}
            onKeyDown={handleKeyDown}
            searchOnClick={searchOnClick}
          />
          <div className='d-flex justify-content-center py-5'>
            <Dropdown onSelect={(eventKey) => setPerPage(Number(eventKey))}>
              <Dropdown.Toggle className='dropDownClass me-4'>
                Filter Top Coins
              </Dropdown.Toggle>
              <DropdownMenu>
                <DropdownItem eventKey={5}>Top 5</DropdownItem>
                <DropdownItem eventKey={10}>Top 10</DropdownItem>
                <DropdownItem eventKey={25}>Top 25</DropdownItem>
                <DropdownItem eventKey={50}>Top 50</DropdownItem>
                <DropdownItem eventKey={100}>Top 100</DropdownItem>
                <DropdownItem eventKey={200}>Top 200</DropdownItem>
              </DropdownMenu>
              <PercentButton
                onClick={changeToPercent}
                togglePercent={togglePercent}
              />
            </Dropdown>
          </div>

          <div className='d-flex justify-content-center h-auto mh-100'>
            <table id='table'>
              <thead>
                <tr>
                  <th>Icon</th>
                  <th className='hideMobile'>Name</th>
                  <th>Symbol</th>
                  <th>Price</th>
                  <th>24H Change</th>
                  <th className='hideMobile'>Market Cap</th>
                  <th className='hideMobile'>Volume</th>
                </tr>
              </thead>
              <tbody>
                {(filtered.length > 0 ? filtered : cryptoData).map(
                  (coin, index) => (
                    <tr key={coin.id}>
                      <td className='d-flex justify-content-center align-items-center'>
                        <span className="me-2 nowrap">{index + 1}.</span>
                        <img
                          src={coin.image}
                          alt={coin.name}
                          style={{ width: '32px', height: '32px'}}
                          />
                      </td>
                      <td className='hideMobile'>{coin.name}</td>
                      <td>{coin.symbol.toUpperCase()}</td>
                      <td>${fixDecimal(coin.current_price)}</td>
                      <td
                        style={
                          togglePercent
                            ? priceStyle(
                                changeInPercent(
                                  coin.price_change_24h,
                                  coin.current_price
                                )
                              ).style
                            : priceStyle(coin.price_change_24h).style
                        }
                      >
                        {togglePercent
                          ? `${priceStyle(
                              changeInPercent(
                                coin.price_change_24h,
                                coin.current_price
                              )
                            ).text}%`
                          : `${priceStyle(coin.price_change_24h).text}$`}
                      </td>
                      <td className='hideMobile'>${fixMarketCapVolume(coin.market_cap)}</td>
                      <td className='hideMobile'>${fixMarketCapVolume(coin.total_volume)}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
