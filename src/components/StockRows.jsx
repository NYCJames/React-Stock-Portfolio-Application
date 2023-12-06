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

  const temp = new Date(1701723600);
  //   console.log(temp.toLocaleTimeString());
  //   console.log(temp.toString());

  return (
    <tr className="table-row">
      <th scope="row">{ticker}</th>
      <td>{last}</td>
      <td className={`text-${changeColor(change)}`}>
        {change}
        {changeIcon(change)}
      </td>
      <td className={`text-${changeColor(pctchange)}`}>
        {pctchange} {changeIcon(pctchange)}
      </td>
      <td>{high}</td>
      <td>{low}</td>
      <td>{open}</td>
      <td>{prevclose}</td>
      <td>{new Date(time).toTimeString()}</td>
    </tr>
  );
}

export default StockRows;
