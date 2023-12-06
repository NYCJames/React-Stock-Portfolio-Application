import React from "react";
import { PiCaretUpFill, PiCaretDownFill } from "react-icons/pi";

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

  function handleClick(event) {
    //go to details
    console.log(event.target.parentElement.id);
  }

  const temp = new Date(1701723600);
  //   console.log(temp.toLocaleTimeString());
  //   console.log(temp.toString());

  return (
    <tr id={ticker} className="table-row" onClick={handleClick}>
      <th scope="row">{ticker}</th>
      <td className="text-end">{Number(last).toFixed(3)}</td>
      <td className={`text-end text-${changeColor(change)}`}>
        {Number(change).toFixed(3)}
        {changeIcon(change)}
      </td>
      <td className={`text-end text-${changeColor(pctchange)}`}>
        {Number(pctchange).toFixed(4)}%{changeIcon(pctchange)}
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
