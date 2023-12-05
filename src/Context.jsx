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
  ]);
  const [stockQuotes, setStockQuotes] = useState([]);

  useEffect(function () {
    let isMounted = true;

    async function fetchQuote() {
      try {
        const response = await Promise.all(
          stockList.map(function (value) {
            return FinnHub.get(`/quote`, {
              params: {
                symbol: value,
              },
            });
          })
        );
        //   console.log(response);

        const data = response.map(function (value) {
          return {
            ticker: value.config.params.symbol,
            data: value.data,
          };
        });
        console.log(data);

        if (isMounted) {
          setStockQuotes([...data]);
          console.log(stockQuotes);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchQuote();

    return function () {
      isMounted = false;
    };
  }, []);

  return (
    <AppContext.Provider value={{ stockList, setStockList }}>
      {children}
    </AppContext.Provider>
  );
}

export default function useGlobalContext() {
  return useContext(AppContext);
}
