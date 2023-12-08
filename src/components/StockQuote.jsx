import useGlobalContext from "../Context";

function StockQuote({ currQuote }) {
  const { changeColor, changeIcon } = useGlobalContext();

  return (
    <div>
      <h4>{currQuote.pc}</h4>
      <h2>{currQuote.c}</h2>
      <h3 className={`text-${changeColor(currQuote.d)}`}>
        {currQuote.d} {changeIcon(currQuote.d)}
      </h3>
      <h3 className={`text-${changeColor(currQuote.dp)}`}>
        {currQuote.dp}% {changeIcon(currQuote.dp)}
      </h3>
      <h4>{currQuote.o}</h4>
      <h4>{currQuote.c}</h4>
    </div>
  );
}

export default StockQuote;
