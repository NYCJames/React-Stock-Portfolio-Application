import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FinnHub from "../apis/FinnHub";
import Polygon from "../apis/Polygon";

function StockDetailsPage() {
  const { ticker } = useParams();
  const [currQuote, setCurrQuote] = useState();

  useEffect(function () {
    async function fetchHistoricalData() {
      try {
        ////// get market status + curr quote

        // console.log(ticker);

        const currentStatus = await Promise.all([
          FinnHub.get(`/quote`, {
            params: {
              symbol: ticker,
            },
          }),
          Polygon.get(`v1/marketstatus/now`),
        ]);
        // console.log(currentStatus);
        setCurrQuote(currentStatus[0][`data`]);

        const marketOpen = currentStatus[1][`data`][`market`] !== `closed`;
        // console.log(marketOpen);

        ////// if closed use time in last quote
        ////// if open use curr time

        // console.log(new Date().getDate());
        const today = new Date();
        let time;
        // console.log(today.getTime());
        if (marketOpen) {
          time = today.getTime();
          //   console.log(`time = ${time}`);
        } else {
          time = currentStatus[0][`data`][`t`] * 1000;
          //   console.log(`prev time = ${time}`);
        }
        // console.log(time);
        const oneDayAgo = time - 24 * 60 * 60 * 1000;
        const oneWeekAgo = time - 24 * 60 * 60 * 7 * 1000;
        const oneMonthAgo = time - 24 * 60 * 60 * 30 * 1000;
        const oneYearAgo = time - 24 * 60 * 60 * 365 * 1000;
        // console.log(oneDayAgo, oneWeekAgo, oneMonthAgo, oneYearAgo);

        ////// fetch historical data
        // test: https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/minute/1701810000000/1701896400000?adjusted=true&sort=asc&limit=50000&apiKey=ApHk9sz3p3OdqFNA7QuFsJTTNjT3uURY

        const response = await Promise.all([
          Polygon.get(
            `v2/aggs/ticker/${ticker}/range/${`1`}/${`minute`}/${oneDayAgo}/${time}`,
            {
              params: {
                adjusted: true,
                sort: `asc`,
                limit: 50000,
              },
            }
          ),
          Polygon.get(
            `v2/aggs/ticker/${ticker}/range/${`1`}/${`minute`}/${oneWeekAgo}/${time}`,
            {
              params: {
                adjusted: true,
                sort: `asc`,
                limit: 50000,
              },
            }
          ),
          Polygon.get(
            `v2/aggs/ticker/${ticker}/range/${`1`}/${`minute`}/${oneMonthAgo}/${time}`,
            {
              params: {
                adjusted: true,
                sort: `asc`,
                limit: 50000,
              },
            }
          ),
          Polygon.get(
            `v2/aggs/ticker/${ticker}/range/${`2`}/${`minute`}/${oneYearAgo}/${time}`,
            {
              params: {
                adjusted: true,
                sort: `asc`,
                limit: 50000,
              },
            }
          ),

          //   Polygon.get(
          //     `v2/aggs/ticker/AAPL/range/1/minute/1701810000000/1701896400000?adjusted=true&sort=asc&limit=50000`
          // {
          //   params: {
          //     adjusted: true,
          //     sort: `asc`,
          //     limit: 50000,
          //   },
          // }
          //   ),
        ]);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    fetchHistoricalData();
  }, []);

  //   console.log(currQuote);
  return <div>{ticker}</div>;
}

export default StockDetailsPage;
