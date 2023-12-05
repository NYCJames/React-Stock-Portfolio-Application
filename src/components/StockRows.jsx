import React from "react";

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

  const temp = new Date(1701723600);
  //   console.log(temp.toLocaleTimeString());
  //   console.log(temp.toString());

  return (
    <tr className="table-row">
      <th scope="row">{ticker}</th>
      <td>{last}</td>
      <td className={`text-${changeColor(change)}`}>{change}</td>
      <td className={`text-${changeColor(pctchange)}`}>{pctchange}</td>
      <td>{high}</td>
      <td>{low}</td>
      <td>{open}</td>
      <td>{prevclose}</td>
      <td>{new Date(time).toTimeString()}</td>
    </tr>
  );
}

export default StockRows;
