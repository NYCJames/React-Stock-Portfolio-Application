import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import FinnHub from "../apis/FinnHub";

function StockDetailsPage() {
  const { ticker } = useParams();

  useEffect(function () {
    async function fetchHistoricalData() {
      try {
        const { data } = await FinnHub.get(``, {
          params: {},
        });
      } catch (error) {
        console.log(error);
      }
    }
  });

  return <div>{ticker}</div>;
}

export default StockDetailsPage;
