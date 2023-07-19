import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css'; // Import the CSS file
import ChartComponent from './ChartComponent';
import { styled } from "@mui/system";
import { Typography,CircularProgress, } from '@mui/material';
import Button from '@mui/material/Button';
import Loader from './Loader';

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinDetails = (props) => {
  const [coinDetails, setCoinDetails] = useState(null);
  const [coinChartData, setCoinChartData] = useState(null);
  const [days, setDays] = useState('24h');
  const [selectedButton, setSelectedButton] = useState('24h');
  const [loading , isLoading] = useState(false)
  const handleButtonClick = (days) => {
    setDays(days)
    setSelectedButton(days);
  };
  const { id } = useParams();

  useEffect(() => {
    const fetchCoinDetails = async () => {
      try {
        // Fetch the coin details using the id
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
        const data = await response.json();
        setCoinDetails(data);
        console.log(data);

        // Fetch the coin market chart data
        const chartResponse = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${props.currency.toLowerCase()}&days=${days}`);
        const chartData = await chartResponse.json();
        setCoinChartData(chartData);
        console.log(chartData);
      } catch (error) {
        isLoading(true)
      }
    };

    fetchCoinDetails();
  }, [id, props.currency, days, selectedButton]);
  const useStyles = styled((theme) => ({
    container: {
      display: "flex",
     
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    sidebar: {
      width: "30%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Montserrat",
    },
    description: {
      width: "100%",
      fontFamily: "Montserrat",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
    },
    marketData: {
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "space-around",
        alignItems:"center"
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
    },
   
  }));

  const classes = useStyles();

  if (!coinDetails || !coinChartData) {
    return (
      
       <Loader/>
      );
    }
  const { image, name, description, market_cap_rank, market_data } = coinDetails;

  return (
  <div className={classes.container}style={{backgroundColor:'rgb(5 11 32)',color:'white'}}>
    <div className={classes.sidebar}>
    <img
          src={image.large}
          alt={name}
          height="200"
          style={{ marginBottom: 20 }}
        />
              <Typography variant="h3" className={classes.heading}style={{paddingLeft:'20px'}}>
          {name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}style={{paddingLeft:'20px'}}>
          {description.en.split(". ")[0]}.
        </Typography>
        <div className={classes.marketData}style={{paddingLeft:'20px'}}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {numberWithCommas(market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {props.symbol}{" "}
              {numberWithCommas(
                market_data.current_price[props.currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {props.symbol}{" "}
              {numberWithCommas(
                market_data.market_cap[props.currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </div>
    </div>
    <ChartComponent coinChartData={coinChartData} currency={props.currency} />
    <div className="time-range-buttons" style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
                paddingBottom:'10px'
              }}>
        {/* <button onClick={() => setDays('24h')}>24h</button> */}
        <Button
        style={{
          backgroundColor: selectedButton === '7d' ? 'rgb(5 11 32)' : 'white',
          color: selectedButton === '7d' ? 'white' : 'rgb(5 11 32)',
        }}
        size="small"
        variant="contained"
        onClick={() => handleButtonClick('7d')}
      >
        7d
      </Button>     
      <Button
        style={{
          backgroundColor: selectedButton === '30d' ? 'rgb(5 11 32)' : 'white',
          color: selectedButton === '30d' ? 'white' : 'rgb(5 11 32)',
        }}
        size="small"
        variant="contained"
        onClick={() => handleButtonClick('30d')}
      >
        1M
      </Button> <Button
        style={{
          backgroundColor: selectedButton === '180d' ? 'rgb(5 11 32)' : 'white',
          color: selectedButton === '180d' ? 'white' : 'rgb(5 11 32)',
        }}
        size="small"
        variant="contained"
        onClick={() => handleButtonClick('180d')}
      >
        6M
      </Button> <Button
        style={{
          backgroundColor: selectedButton === '365' ? 'rgb(5 11 32)' : 'white',
          color: selectedButton === '365' ? 'white' : 'rgb(5 11 32)',
        }}
        size="small"
        variant="contained"
        onClick={() => handleButtonClick('365')}
      >
        1y
      </Button>   
      </div>
  </div>
  );
};

export default CoinDetails;
