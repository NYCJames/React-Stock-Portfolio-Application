import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  //localstorage
  const [stockList, setStockList] = useState([
    "AAPL",
    "GOOGL",
    "MSFT",
    "NVDA",
    "AMD",
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
