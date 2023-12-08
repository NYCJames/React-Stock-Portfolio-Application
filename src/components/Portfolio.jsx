import React, { useEffect, useState } from "react";
import useGlobalContext from "../Context";
import StockRows from "./StockRows";
import FinnHub from "../apis/FinnHub";

function Portfolio() {
  const [stockQuotes, setStockQuotes] = useState([]);
  const { stockList } = useGlobalContext();
  //   console.log(stockQuotes);

  useEffect(
    function () {
      let isMounted = true;

      async function fetchQuote() {
        try {
          const response = await Promise.all(
            stockList.map(function (value) {
              return FinnHub.get(`/quote`, {
                params: {
                  symbol: value,
                },
              });
            })
          );
          console.log(response);

          const data = response.map(function (value) {
            return {
              ticker: value.config.params.symbol,
              data: value.data,
            };
          });
          //   console.log(data);

          if (isMounted) {
            setStockQuotes(data);
            // console.log(stockQuotes);
          }
        } catch (error) {
          console.log(`err`, error);
        }
      }

      fetchQuote();

      return function () {
        isMounted = false;
      };
    },
    [stockList]
  );

  return (
    <div>
      <table className="table table-hover hover mt-5 table-striped">
        <thead style={{ color: "rgb(79,89,102" }}>
          <tr>
            <th scope="col">Name</th>
            <th scope="col" className="text-center">
              Last
            </th>
            <th scope="col" className="text-center">
              Change
            </th>
            <th scope="col" className="text-center">
              % Change
            </th>
            <th scope="col" className="text-center">
              High
            </th>
            <th scope="col" className="text-center">
              Low
            </th>
            <th scope="col" className="text-center">
              Open
            </th>
            <th scope="col" className="text-center">
              PrevClose
            </th>
            <th scope="col" className="text-end">
              Last Updated
            </th>
          </tr>
        </thead>
        <tbody>
          {stockQuotes.map(function (value) {
            return (
              <StockRows
                key={value.ticker}
                ticker={value.ticker}
                last={value.data.c}
                change={value.data.d}
                pctchange={value.data.dp}
                high={value.data.h}
                low={value.data.l}
                open={value.data.o}
                prevclose={value.data.pc}
                time={value.data.t}
              ></StockRows>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Portfolio;
