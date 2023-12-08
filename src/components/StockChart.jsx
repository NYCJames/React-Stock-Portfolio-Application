import { useState } from "react";
import Chart from "react-apexcharts";
import { findDOMNode } from "react-dom";

function StockChart({ chartData, ticker }) {
  const { day, week, month, year } = chartData;
  const dollarTicker = `$${ticker}`;
  const [timeframe, setTimeframe] = useState(`day`);

  const series = [
    {
      name: ticker,
      data: returnCorrectData(),
      //   data: [
      //     {
      //       x: Number(1701890100000),
      //       y: 120.56,
      //     },
      //   ],
    },
  ];
  //   console.log(series);

  const options = {
    title: {
      text: dollarTicker,
      align: `center`,
      style: {
        fontSize: `24px`,
      },
    },
    chart: {
      id: `Stock Data`,
      animations: {
        speed: 1000,
      },
    },
    xaxis: {
      type: `datetime`,
      //   tickAmount: 12,
      labels: {
        show: true,
        min: series[0][`data`][0][`x`],
        datetimeUTC: false,
        // tickPlacement: `between`,
        format: `MMM d yyyy hh:mmTT`,
      },
      //   crosshairs: {
      //     show: true,
      //   },
      //   tooltip: {
      //     enabled: true,
      //   },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      x: {
        format: "MMM d yyyy hh:mmTT",
      },
    },
  };

  function handleSetTimeframe(event) {
    console.log(event.target.innerText.toLowerCase());
    setTimeframe(event.target.innerText.toLowerCase());

    // console.log(timeframe);
  }

  function returnCorrectData() {
    switch (timeframe) {
      default:
        return day;
      case `day`:
        return day;
      case `week`:
        return week;
      case `month`:
        return month;
      case `year`:
        return year;
    }
  }

  function assignButtonClasses(value) {
    return `btn m-1 btn-${timeframe === value ? `` : `outline-`}primary`;
  }

  return (
    <div className="mt-5 p-4 shadow-sm bg-white">
      <Chart options={options} series={series} type="area" width="100%"></Chart>
      <div>
        <button
          className={assignButtonClasses(`day`)}
          onClick={handleSetTimeframe}
        >
          Day
        </button>
        <button
          className={assignButtonClasses(`week`)}
          onClick={handleSetTimeframe}
        >
          Week
        </button>
        <button
          className={assignButtonClasses(`month`)}
          onClick={handleSetTimeframe}
        >
          Month
        </button>
        <button
          className={assignButtonClasses(`year`)}
          onClick={handleSetTimeframe}
        >
          Year
        </button>
      </div>
    </div>
  );
}

export default StockChart;
