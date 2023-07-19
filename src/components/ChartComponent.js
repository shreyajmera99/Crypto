import React from 'react';
import { Line } from 'react-chartjs-2';
import {  styled } from "@mui/system";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js'
  import { Chart } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
const ChartComponent = ({ coinChartData, currency }) => {
  const chartLabels = coinChartData.prices.map((priceData) => {
    const date = new Date(priceData[0]);
    return date.toLocaleDateString();
  });

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: `Price (${currency})`,
        data: coinChartData.prices.map((priceData) => priceData[1]),
        borderColor: 'crimson',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  
  const useStyles = styled((theme) => ({
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
  }));
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Line data={chartData} options={chartData} />
    </div>
  );    
};

export default ChartComponent;
