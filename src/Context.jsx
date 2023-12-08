import { createContext, useContext, useEffect, useState } from "react";
import FinnHub from "./apis/FinnHub";
import { PiCaretUpFill, PiCaretDownFill } from "react-icons/pi";

const AppContext = createContext();

export function AppProvider({ children }) {
  //localstorage
  const [stockList, setStockList] = useState(fetchLocalStockList());

  function fetchLocalStockList() {
    // console.log(JSON.parse(localStorage.getItem(`stockList`)));
    return JSON.parse(localStorage.getItem(`stockList`))
      ? JSON.parse(localStorage.getItem(`stockList`))
      : [`SPY`, `AAPL`, `GOOGL`, `MSFT`, `AMZN`, `VIXY`];
  }

  function changeColor(value) {
    return value > 0 ? "success" : "danger";
  }

  function changeIcon(value) {
    return value > 0 ? (
      <PiCaretUpFill></PiCaretUpFill>
    ) : (
      <PiCaretDownFill></PiCaretDownFill>
    );
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

    // const newStockList = stockList.filter(function (value) {
    //   return value !== symbol;
    // });
    // console.log(newStockList);

    // console.log(stockList);
    // setStockList(newStockList);
    setStockList(
      stockList.filter(function (value) {
        return value !== symbol;
      })
    );
    // localStorage.setItem(`stockList`, JSON.stringify(newStockList));
    localStorage.setItem(`stockList`, JSON.stringify(stockList));

    // console.log(stockList);
  }

  return (
    <AppContext.Provider
      value={{
        stockList,
        addToStockList,
        deleteFromStockList,
        changeColor,
        changeIcon,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default function useGlobalContext() {
  return useContext(AppContext);
}
