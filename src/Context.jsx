import { createContext, useContext, useEffect, useState } from "react";
import FinnHub from "./apis/FinnHub";

const AppContext = createContext();

export function AppProvider({ children }) {
  //localstorage
  const [stockList, setStockList] = useState([]);

  function fetchLocalStockList() {}

  function addToStockList(symbol) {
    setStockList([...stockList, symbol]);
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
