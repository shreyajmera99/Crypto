import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import axios from "axios";
import Loader from "./Loader";

const Slider = (props) => {
  const [coinData, setGetData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${props.currency}&order=market_cap_desc&per_page=10&page=10&sparkline=false`
      )
      .then((response) => {
        setGetData(response.data);
        console.log(response.data);
      })
      .catch(() => {
        setLoading(true);
      });
  }, [props.currency]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div
        className="imp"
        style={{ height: "150%", backgroundColor: "#FFFAF0", padding: "30px" }}
      >
        <div
          className="carousel"
          style={{
            height: "50%",
            display: "flex",
            alignItems: "center",
            backgroundColor: "#FFFAF0",
            paddingTop: "20px",
            color: "blue ",
          }}
        >
          <AliceCarousel
            items={coinData.map((coin) => (
              <div
                className="carouselItem"
                key={coin.id}
                style={{
                  height: "50%",
                  width: "20%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                  textTransform: "uppercase",
                  color: "blue",
                  paddingLeft: "20px", // Set the background color of the carousel items to black
                }}
              >
                <img
                  src={
                    coin.image ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl7Cadho1YF1TCFZRfanGSwIxnklacJPtiycrPEgtw&s"
                  }
                  alt={coin.name}
                  height="80"
                  style={{ marginBottom: 10 }}
                />
                <p style={{ color: "black", fontSize: "18px" }}>{coin.name}</p>
                <p style={{ color: "black" }}>
                  {props.symbol}
                  {coin.current_price.toFixed(2)}
                </p>
              </div>
            ))}
            infinite
            autoPlayInterval={1000}
            animationDuration={1500}
            disableDotsControls
            disableButtonsControls
            autoPlay
            responsive={{
              0: { items: 2 },
              768: { items: 3 },
              1024: { items: 4 },
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Slider;
