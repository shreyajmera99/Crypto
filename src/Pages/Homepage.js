import React from "react";
import Slider from "../components/Slider";
import BasicTable from "../components/Table";

const Homepage = (props) => {
  const { currency, symbol } = props;

  return (
    <>
      <Slider currency={props.currency} symbol={symbol} />
      <BasicTable currency={props.currency} symbol={symbol} />
    </>
  );
};

export default Homepage;
