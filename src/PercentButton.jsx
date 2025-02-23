export default function PercentButton({ onClick, togglePercent }) {
    return (
      // Button to toggle between percentage and dollar representation of 24h change
      // Button zum Umschalten zwischen Prozent- und Dollar-Darstellung der 24h-Änderung
      <button onClick={onClick} className="btn btn-primary ms-1 dropDownClass">
        {togglePercent ? "Change 24h to $" : "Change 24h to %"}
      </button>
    );
  }