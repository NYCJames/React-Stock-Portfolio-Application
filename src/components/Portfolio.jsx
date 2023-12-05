import React from "react";
import useGlobalContext from "../Context";

function Portfolio() {
  const { stockList } = useGlobalContext();
  //   console.log(stockList);

  return <div>{stockList}</div>;
}

export default Portfolio;
