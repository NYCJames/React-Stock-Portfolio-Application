import { createContext, useContext, useEffect, useState } from "react";
import FinnHub from "./apis/FinnHub";

const AppContext = createContext();

export function AppProvider({ children }) {
  //localstorage
  const [stockList, setStockList] = useState([
    "AAPL",
    "GOOGL",
    "MSFT",
    "NVDA",
    "AMD",
    "ED",
    "GLD",
  ]);

  return (
    <AppContext.Provider value={{ stockList, setStockList }}>
      {children}
    </AppContext.Provider>
  );
}

export default function useGlobalContext() {
  return useContext(AppContext);
}
