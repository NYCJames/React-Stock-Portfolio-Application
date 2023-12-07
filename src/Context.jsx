import { createContext, useContext, useEffect, useState } from "react";
import FinnHub from "./apis/FinnHub";
import { json } from "react-router-dom";

const AppContext = createContext();

export function AppProvider({ children }) {
  //localstorage
  const [stockList, setStockList] = useState(fetchLocalStockList());

  function fetchLocalStockList() {
    // console.log(JSON.parse(localStorage.getItem(`stockList`)));
    return JSON.parse(localStorage.getItem(`stockList`))
      ? JSON.parse(localStorage.getItem(`stockList`))
      : [];
  }

  function addToStockList(symbol) {
    if (stockList.includes(symbol)) {
      return;
    }
    setStockList([...stockList, symbol]);

    localStorage.setItem(`stockList`, JSON.stringify([...stockList, symbol]));
  }

  function deleteFromStockList(symbol) {
    if (!stockList.includes(symbol)) {
      return;
    }

    const newStockList = stockList.filter(function (value) {
      return value !== symbol;
    });
    setStockList(newStockList);
  }

  return (
    <AppContext.Provider value={{ stockList, setStockList, addToStockList }}>
      {children}
    </AppContext.Provider>
  );
}

export default function useGlobalContext() {
  return useContext(AppContext);
}
