import React from "react";
import { useParams } from "react-router-dom";

function StockDetailsPage() {
  const { ticker } = useParams();
  return <div>{ticker}</div>;
}

export default StockDetailsPage;
