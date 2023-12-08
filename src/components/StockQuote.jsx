import useGlobalContext from "../Context";

function StockQuote({ ticker, currQuote, logoURL }) {
  const { changeColor, changeIcon } = useGlobalContext();

  const html = (
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

  const fullLogoURL = `${logoURL}?apiKey=EdnE88bbigxrc68qlgtS4313p5h1mUpa`;

  return (
    <div className="container col-xxl-12 px-1 py-3">
      <div className="row flex-lg-row-reverse align-items-center g-1 py-4">
        <div className="col-12 col-sm-12 col-lg-6">
          <img
            src={fullLogoURL}
            width="250px"
            className="d-block mx-auto img-fluid"
          ></img>
        </div>

        <div className="col-lg-6">
          <div className="row text-center">
            <h1 className="display-1 fw-bold text-body-emphasis lh-1 mb-2">
              ${ticker}
            </h1>
          </div>
          <div className="row mb-3 text-center">
            <div className="col-4 align-self-center">
              <h4>{currQuote.pc}</h4>
            </div>
            <div className="col-4 mb-3 align-self-center">
              <h2 className={`text-${changeColor(currQuote.d)}`}>
                {currQuote.d} {changeIcon(currQuote.d)}
              </h2>
              <h2 className={`text-${changeColor(currQuote.dp)}`}>
                {currQuote.dp}% {changeIcon(currQuote.dp)}
              </h2>
            </div>
            <div className="col-4 mb-3 align-self-center">
              <h4>{currQuote.h}</h4>
              <h1>{currQuote.c}</h1>
              <h4>{currQuote.l}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StockQuote;
