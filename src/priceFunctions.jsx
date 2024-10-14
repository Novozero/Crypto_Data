
  function handleKeyDown(event) {
    if (event.key === "Enter") {
      searchOnClick();
    }
    if (event.key === "Escape") {
      setInputField("");
    }
  }

  /**Fix Decimal on current price */

  function fixDecimal(price) {
    if (price !== null && price !== undefined && !isNaN(price)) {
      if (Math.abs(price) >= 0.01) {
        return price.toFixed(2);
      } else {
        return price.toFixed(8);
      }
    } else {
      return 'N/A';
    }
  }

  function changeInPercent(changeIn24H, basePrice) {
    let sum = (changeIn24H / basePrice) * 100;
    if (sum < 0.01) {
      return Math.abs(sum.toFixed(2));
    } else {
      return Math.abs(sum);
    }
  }

  function priceStyle(changeValue) {
    if (changeValue > 0) {
      return {
        style: { color: '#66bb6a' },
        text: `▲ ${fixDecimal(changeValue)}`,
      };
    } else {
      return {
        style: { color: '#ef5350' },
        text: `▼ ${fixDecimal(changeValue)}`,
      };
    }
  }

  //fix price from market cap and volume
  
  function fixMarketCapVolume(price){
    if(price > 1e12){
      return (price/ 1e12).toFixed(2)+ '\u00A0T'
    }
    else if(price > 1e9){
      return (price/ 1e9).toFixed(2)+ '\u00A0B'
    }
    else if (price > 1e6){
      return (price/ 1e6).toFixed(2)+ '\u00A0M'
    }
  }

  export {priceStyle, changeInPercent, fixDecimal, handleKeyDown, fixMarketCapVolume}