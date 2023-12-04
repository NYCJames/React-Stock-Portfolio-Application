import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import StockOverviewPage from "./pages/StockOverviewPage";
import StockDetailsPage from "./pages/StockDetailsPage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<StockOverviewPage></StockOverviewPage>}></Route>
        <Route
          path="detail/:ticker"
          element={<StockDetailsPage></StockDetailsPage>}
        ></Route>
      </Route>
    )
  );

  return (
    <main className="container">
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

export default App;
