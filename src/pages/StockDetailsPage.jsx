import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import FinnHub from "../apis/FinnHub";
import Polygon from "../apis/Polygon";

function StockDetailsPage() {
  const { ticker } = useParams();

  useEffect(function () {
    async function fetchHistoricalData() {
      try {
        // console.log(new Date().getDate());
        const today = new Date();
        // console.log(today.getTime());

        if (today.getDay() === false) {
        }

        // get market status + curr quote
        // if closed use time in last quote
        // if open use curr time

        // console.log(ticker);

        const currentStatus = await Promise.all([
          FinnHub.get(`/quote`, {
            params: {
              symbol: ticker,
            },
          }),
          Polygon.get(`v1/marketstatus/now`),
        ]);
        console.log(currentStatus);

        // const { data } = await Polygon.get(
        //   `aggs/ticker/${AAPL}/range/${1}/${second}/${2023}-${new Date().getMonth()}-${new Date().getMonth()}/${2023}-${new Date().getMonth()}-${new Date().getMonth()}/`,
        //   {
        //     params: {
        //       adjusted: true,
        //       sort: `asc`,
        //       limit: 150,
        //     },
        //   }
        // );
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchHistoricalData();
  }, []);

  return <div>{ticker}</div>;
}

export default StockDetailsPage;
