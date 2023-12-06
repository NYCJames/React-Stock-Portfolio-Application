import React from "react";
import { PiCaretUpFill, PiCaretDownFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

function StockRows({
  ticker,
  last,
  change,
  pctchange,
  high,
  low,
  open,
  prevclose,
  time,
}) {
  const navigate = useNavigate();

  function changeColor(value) {
    return value > 0 ? "success" : "danger";
  }

  function changeIcon(value) {
    return value > 0 ? (
      <PiCaretUpFill></PiCaretUpFill>
    ) : (
      <PiCaretDownFill></PiCaretDownFill>
    );
  }

  function goToDetailsPage() {
    // console.log(event.target.parentElement.id);
    // console.log(ticker);

    navigate(`details/${ticker}`);
  }

  const temp = new Date(1701723600);
  //   console.log(temp.toLocaleTimeString());
  //   console.log(temp.toString());

  return (
    <tr
      id={ticker}
      className="table-row"
      onClick={goToDetailsPage}
      style={{ cursor: `pointer` }}
    >
      <th scope="row">{ticker}</th>
      <td className="text-end">{Number(last).toFixed(3)}</td>
      <td className={`text-end text-${changeColor(change)}`}>
        {Number(change).toFixed(3)} {changeIcon(change)}
      </td>
      <td className={`text-end text-${changeColor(pctchange)}`}>
        {Number(pctchange).toFixed(4)}% {changeIcon(pctchange)}
      </td>
      <td className="text-end">{Number(high).toFixed(3)}</td>
      <td className="text-end">{Number(low).toFixed(3)}</td>
      <td className="text-end">{Number(open).toFixed(3)}</td>
      <td className="text-end">{Number(prevclose).toFixed(3)}</td>
      <td className="text-end">{new Date(time).toTimeString()}</td>
      <td>{time}</td>
    </tr>
  );
}

export default StockRows;
