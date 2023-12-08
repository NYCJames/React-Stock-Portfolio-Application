import React from "react";
import { useNavigate } from "react-router-dom";
import useGlobalContext from "../Context";

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
  const { changeColor, changeIcon, deleteFromStockList } = useGlobalContext();

  function handleClickStockRow(event) {
    // console.log(event.target.parentElement.id);
    // console.log(ticker);
    // console.log(event.target.classList.contains(`delete-button`));

    if (event.target.classList.contains(`delete-button`)) {
      deleteFromStockList(ticker);
      //   console.log(stockList);
    } else {
      navigate(`details/${ticker}`);
    }
  }

  //   const temp = new Date(1701883080 * 1000);
  //   const temp = new Intl.DateTimeFormat(`en-US`);
  //   temp.setTime(1701883080);
  //   console.log(temp);
  //   temp.setMilliseconds(1701883080);
  //   console.log(new Date(time * 1000).toLocaleTimeString());

  return (
    <tr
      id={ticker}
      className="table-row"
      onClick={handleClickStockRow}
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
      <td className="text-center">{new Date(time * 1000).toLocaleString()}</td>
      {/* <td>{time}</td> */}
      <td className="text-center">
        <button className="btn btn-danger btn-sm ml-3 d-inline-block delete-button">
          Remove
        </button>
      </td>
    </tr>
  );
}

export default StockRows;
