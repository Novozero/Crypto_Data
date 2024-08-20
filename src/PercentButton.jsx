
export default function PercentButton({onClick, percentToDollar}){

    return(
        <button onClick={onClick}  className="btn btn-primary ms-1">{percentToDollar ? "Change 24h to %" : "Change 24h to $"}</button>
    )
}