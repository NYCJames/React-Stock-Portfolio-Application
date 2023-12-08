import Chart from "react-apexcharts";

function StockChart({ chartData, ticker }) {
  const { day, week, month, year } = chartData;
  const dollarTicker = `$${ticker}`;

  const series = [
    {
      name: ticker,
      data: week,
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
      //   tickAmount: 6,
      labels: {
        show: true,
        min: series[0][`data`][0][`x`],
        datetimeUTC: false,
        // tickPlacement: `between`,
        // formatter: function (value) {
        //   let dateTime = new Date(value).toLocaleString("en-US");
        //   let date = dateTime.split(" ")[1];
        //   return (
        //     ("0" + date.split(":")[0]).slice(-2) +
        //     ":" +
        //     ("0" + date.split(":")[1]).slice(-2)
        //   );
        // },
        // formatter: function (value) {
        //   console.log(value);
        //   return new Date(value);
        // },
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

  return (
    <div className="mt-5 p-4 shadow-sm bg-white">
      <Chart options={options} series={series} type="line" width="100%"></Chart>
      <div>
        <button></button>
      </div>
    </div>
  );
}

export default StockChart;
