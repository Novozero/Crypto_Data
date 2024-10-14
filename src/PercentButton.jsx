
export default function PercentButton({
    onClick, 
    togglePercent,
}){

    return(
        <button onClick={onClick} className="btn btn-primary ms-1 dropDownClass">
            {togglePercent ? "Change 24h to $" : "Change 24h to %"}
        </button>
    )
}