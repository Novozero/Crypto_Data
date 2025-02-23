export default function PercentButton({ onClick, togglePercent }) {
  return (
    // Button to toggle between percentage and dollar representation of 24h change
    // Button zum Umschalten zwischen Prozent- und Dollar-Darstellung der 24h-Änderung
    <button onClick={onClick} className="btn btn-primary ms-1 dropDownClass">
      {togglePercent ? "Change 24h to $" : "Change 24h to %"}
    </button>
  );
}

/** 
 * Fix decimal precision for the current price 
 * Dezimalstellen für den aktuellen Preis korrigieren 
 */
function fixDecimal(price) {
  if (price !== null && price !== undefined && !isNaN(price)) {
    return Math.abs(price) >= 0.01 ? price.toFixed(2) : price.toFixed(8);
  } else {
    return 'N/A';
  }
}

/** 
 * Calculate percentage change based on price 
 * Prozentuale Veränderung basierend auf dem Preis berechnen 
 */
function changeInPercent(changeIn24H, basePrice) {
  let sum = (changeIn24H / basePrice) * 100;
  return sum < 0.01 ? Math.abs(sum.toFixed(2)) : Math.abs(sum);
}

/** 
 * Determine price style based on positive or negative change 
 * Preisstil basierend auf positiver oder negativer Veränderung bestimmen 
 */
function priceStyle(changeValue) {
  if (changeValue > 0) {
    return {
      style: { color: '#66bb6a', whiteSpace: 'nowrap' },
      text: ` ▲ ${fixDecimal(changeValue)}`,
    };
  } else {
    return {
      style: { color: '#ef5350', whiteSpace: 'nowrap' },
      text: ` ▼ ${fixDecimal(changeValue)}`,
    };
  }
}

/** 
 * Format market cap and volume values for readability 
 * Marktkapitalisierung und Volumenwerte für bessere Lesbarkeit formatieren 
 */
function fixMarketCapVolume(price) {
  if (price > 1e12) {
    return (price / 1e12).toFixed(2) + ' T';
  } else if (price > 1e9) {
    return (price / 1e9).toFixed(2) + ' B';
  } else if (price > 1e6) {
    return (price / 1e6).toFixed(2) + ' M';
  }
  return price.toString(); 
}

export { priceStyle, changeInPercent, fixDecimal, fixMarketCapVolume };
