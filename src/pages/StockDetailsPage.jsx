import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FinnHub from "../apis/FinnHub";
import Polygon from "../apis/Polygon";
import StockChart from "../components/StockChart";
import StockQuote from "../components/StockQuote";
import CompanyProfile from "../components/CompanyProfile";

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
  //   console.log(points);

  return points;
}

function StockDetailsPage() {
  const { ticker } = useParams();
  const [currQuote, setCurrQuote] = useState();
  const [chartData, setChartData] = useState();
  const [profileData, setProfileData] = useState({});

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
          Polygon.get(
            `v1/marketstatus/now?apiKey=EdnE88bbigxrc68qlgtS4313p5h1mUpa`
          ),
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

          // api does not return data from current day so use old time as well
          time = currentStatus[0][`data`][`t`] * 1000;
        } else {
          time = currentStatus[0][`data`][`t`] * 1000;
          //   console.log(`prev time = ${time}`);
        }
        // console.log(time);

        ////// state hook to track selected timeframe
        ////// OR use navigate to url and use params to extract selected timeframe with default of 1d
        const oneDayAgo = time - 24 * 60 * 60 * 1000 - 43200000;
        const oneWeekAgo = time - 24 * 60 * 60 * 7 * 1000 - 43200000;
        const oneMonthAgo = time - 24 * 60 * 60 * 30 * 1000 - 43200000;
        const oneYearAgo = time - 24 * 60 * 60 * 365 * 1000 - 43200000;
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
                apiKey: `ApHk9sz3p3OdqFNA7QuFsJTTNjT3uURY`,
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
                apiKey: `ApHk9sz3p3OdqFNA7QuFsJTTNjT3uURY`,
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
                apiKey: `ApHk9sz3p3OdqFNA7QuFsJTTNjT3uURY`,
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
                apiKey: `ApHk9sz3p3OdqFNA7QuFsJTTNjT3uURY`,
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
        // console.log(response);

        setChartData({
          day: extractChartData(response[0]),
          week: extractChartData(response[1]),
          month: extractChartData(response[2]),
          year: extractChartData(response[3]),
        });
      } catch (error) {
        // console.log(error);
        alert(`${error.response.data.error}\nPlease try again in 1 minute.`);
      }
    }

    fetchHistoricalData();
  }, []);

  useEffect(function () {
    async function fetchCompanyProfile() {
      try {
        const { data } =
          await Polygon.get(`/v3/reference/tickers/${ticker}?apiKey=ApHk9sz3p3OdqFNA7QuFsJTTNjT3uURY
                `);
        console.log(data.results);

        setProfileData(data.results);
      } catch (error) {
        // console.log(error);
        alert(`${error.response.data.error}\nPlease try again in 1 minute.`);
      }
    }

    fetchCompanyProfile();
  }, []);

  //   console.log(currQuote);
  // console.log(chartData);
  return (
    <div>
      <h1>Quote: ${ticker}</h1>

      {currQuote && <StockQuote currQuote={currQuote}></StockQuote>}

      {chartData && (
        <StockChart chartData={chartData} ticker={ticker}></StockChart>
      )}

      <CompanyProfile
        ticker={ticker}
        profileData={profileData}
      ></CompanyProfile>
    </div>
  );
}

export default StockDetailsPage;
