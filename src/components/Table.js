import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const BasicTable = (props) => {
  const useStyles = styled({
    pagination: {
      "& .MuiPaginationItem-root": {
        color: "gold",
      },
    },
  });

  const classes = useStyles();
  const navigate = useNavigate();

  const [coinData, setCoinData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false); // Changed the state variable name to 'setLoading'

  useEffect(() => {
    // Fetching data from the CoinGecko API based on the provided currency prop and pagination parameters
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${props.currency}&order=market_cap_desc&per_page=100&page=${page}&sparkline=false`
      )
      .then((response) => {
        setCoinData(response.data);
        setTotalPages(Math.ceil(response.data.length / 10));
        console.log(totalPages);
        setLoading(false); // Set loading to false after fetching data
      })
      .catch((error) => {
        setLoading(true); // Set loading to false in case of an error
        console.error("Error fetching data:", error);
      });
  }, [props.currency, page]);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scroll(0, 450);
  };
  if (loading) {
    return <Loader />;
  }
  console.log("Updated totalPages:", totalPages);

  // Rendering the table with the fetched data
  return (
    <>
      <TableContainer component={Paper} sx={{ border: "none" }}>
        <Table sx={{ minWidth: 300, border: "none" }} aria-label="simple table">
          <TableHead sx={{ bgcolor: "rgb(5 11 32)" }}>
            <TableRow sx={{ minHeight: 30, border: "none" }}>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "18px",
                  border: "none",
                }} // style={{ fontWeight: '500' }}
              >
                Coin
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "18px",
                  border: "none",
                }}
              >
                Price
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "18px",
                  border: "none",
                }}
              >
                24(h)Change
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "18px",
                  border: "none",
                }}
              >
                Market Cap
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coinData
              .slice((page - 1) * 10, (page - 1) * 10 + 10)
              .map((coin) => {
                const {
                  id,
                  name,
                  image,
                  current_price,
                  price_change_percentage_24h,
                  market_cap,
                } = coin;
                const profit = coin.price_change_percentage_24h > 0;

                return (
                  <TableRow
                    key={id}
                    onClick={() => navigate(`/coins/${id}`)}
                    className={classes.row}
                    sx={{
                      "&:last-child td, &:last-child th": { border: "none" },
                      bgcolor: "#FFFAF0",
                      cursor: "pointer",
                    }}
                  >
                    <TableCell
                      sx={{ color: "rgb(5 11 32)", border: "none" }}
                      component="th"
                      scope="row"
                      style={{ fontSize: "18px" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src={image}
                          alt={name}
                          style={{
                            height: "80px",
                            width: "90px",
                            // marginRight: "10px",
                          }}
                        />
                        {name}
                      </div>
                    </TableCell>
                    <TableCell
                      sx={{ color: "rgb(5 11 32)", border: "none" }}
                      align="right"
                      style={{ fontSize: "18px" }}
                    >
                      {props.symbol}
                      {numberWithCommas(current_price)}
                    </TableCell>
                    <TableCell
                      sx={{ color: "rgb(5 11 32)", border: "none" }}
                      align="right"
                      style={{ color: profit > 0 ? "green" : "red" }}
                    >
                      {price_change_percentage_24h}%
                    </TableCell>
                    <TableCell
                      sx={{ color: "rgb(5 11 32)", border: "none" }}
                      align="right"
                      style={{ fontSize: "18px" }}
                    >
                      {numberWithCommas(market_cap)}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={totalPages}
        page={page}
        siblingCount={1}
                  boundaryCount={1}

        shape="rounded"
        onChange={handlePageChange}
        sx={{
          paddingBottom: 5,
          paddingTop:5,
          // width: "100%",
          display: "flex",

          justifyContent: "center",
          backgroundColor:  "rgb(5 11 32)",
          "& .MuiPaginationItem-root": {
            color: "white",
          },
          "& .MuiPaginationItem-root.Mui-selected": {
            backgroundColor: "white", // You can change the background color of the selected page here
            color: "rgb(5 11 32)", // You can change the text color of the selected page here
          },
          "& .MuiPaginationItem-root:hover": {
            backgroundColor: "white", // You can change the background color of the hovered page here
            color: "rgb(5 11 32)", // You can change the text color of the hovered page here
          },
        }}
      />
    </>
  );
};
export default BasicTable;
