import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FinnHub from "../apis/FinnHub";
import Polygon from "../apis/Polygon";
import StockChart from "../components/StockChart";
import useGlobalContext from "../Context";

function extractChartData(item) {
  //   console.log(item.data.results);
  //   return item.data.results;

  //   console.log(item);
  const points = item.data.results.map(function (value) {
    // console.log(value);
    return {
      x: value.t,
      y: value.c,
    };
  });
  console.log(points);

  return points;
}

function StockDetailsPage() {
  const { ticker } = useParams();
  const [currQuote, setCurrQuote] = useState();
  const [chartData, setChartData] = useState();

  const { changeColor, changeIcon } = useGlobalContext();

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
          //   time = today.getTime();
          //   console.log(`time = ${time}`);
          time = currentStatus[0][`data`][`t`] * 1000;
        } else {
          time = currentStatus[0][`data`][`t`] * 1000;
          //   console.log(`prev time = ${time}`);
        }
        // console.log(time);

        ////// state hook to track selected timeframe
        ////// OR use navigate to url and use params to extract selected timeframe with default of 1d
        const oneDayAgo = time - 36 * 60 * 60 * 1000;
        const oneWeekAgo = time - 24 * 60 * 60 * 7 * 1000;
        const oneMonthAgo = time - 24 * 60 * 60 * 30 * 1000;
        const oneYearAgo = time - 24 * 60 * 60 * 365 * 1000;
        // console.log(oneDayAgo, oneWeekAgo, oneMonthAgo, oneYearAgo);

        ////// fetch historical data
        // test: https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/minute/1701810000000/1701896400000?adjusted=true&sort=asc&limit=50000&apiKey=ApHk9sz3p3OdqFNA7QuFsJTTNjT3uURY

        const response = await Promise.all([
          //   Polygon.get(
          //     `v2/aggs/ticker/${ticker}/range/${`1`}/${`minute`}/${oneDayAgo}/${time}`,
          //     {
          //       params: {
          //         adjusted: true,
          //         sort: `asc`,
          //         limit: 50000,
          //       },
          //     }
          //   ),
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
          //   Polygon.get(
          //     `v2/aggs/ticker/${ticker}/range/${`1`}/${`minute`}/${oneMonthAgo}/${time}`,
          //     {
          //       params: {
          //         adjusted: true,
          //         sort: `asc`,
          //         limit: 50000,
          //       },
          //     }
          //   ),
          //   Polygon.get(
          //     `v2/aggs/ticker/${ticker}/range/${`2`}/${`minute`}/${oneYearAgo}/${time}`,
          //     {
          //       params: {
          //         adjusted: true,
          //         sort: `asc`,
          //         limit: 50000,
          //       },
          //     }
          //   ),

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

        setChartData({
          //   day: extractChartData(response[0]),
          week: extractChartData(response[0]),
          //   month: extractChartData(response[2]),
          //   year: extractChartData(response[3]),
        });
      } catch (error) {
        console.log(error);
      }
    }

    fetchHistoricalData();
  }, []);

  //   console.log(currQuote);
  //   console.log(chartData);
  return (
    <div>
      <h1>Quote: ${ticker}</h1>

      {currQuote && (
        <>
          <h4>{currQuote.pc}</h4>
          <h2>{currQuote.c}</h2>
          <h3 className={`text-${changeColor(currQuote.d)}`}>
            {currQuote.d} {changeIcon(currQuote.d)}
          </h3>
          <h3 className={`text-${changeColor(currQuote.dp)}`}>
            {currQuote.dp}% {changeIcon(currQuote.dp)}
          </h3>
          <h4>{currQuote.o}</h4>
          <h4>{currQuote.c}</h4>
        </>
      )}

      {chartData && (
        <StockChart chartData={chartData} ticker={ticker}></StockChart>
      )}
    </div>
  );
}

export default StockDetailsPage;
