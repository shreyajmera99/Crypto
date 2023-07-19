import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useNavigate } from 'react-router-dom';
import { styled } from "@mui/system";
import '../App.css'; // Import the CSS file

export default function DenseAppBar(props) {

  // const handleChange = (event: SelectChangeEvent) => {
  //   setAge(event.target.value);
  // };
  const navigate = useNavigate();
  const useStyles = styled({
    select: {
      paddingRight: '0px',
    },
  });
  const classes = useStyles();

  return (
    <Box sx={{ flexGrow: 1, color: "white" }}>
      <AppBar
        position="static"
        style={{ color: "white", backgroundColor: "rgb(5 11 32)" }}
      >
        <Container>
          <Toolbar variant="dense">
            <Typography
              variant="h6"
              color="inherit"
              style={{
                flex: 1,
                color: "white",
                fontFamily: "Montserrat",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "32px",

              }}
              onClick={() => navigate(`/`)}

            >
              CRYPTO
            </Typography>
            <Select
              style={{ minwidth: 20, height: 40, marginLeft: 15,color:'white'}}
              value={props.currency}
              onChange={(e) => props.setCurrency(e.target.value)}
              classes={{ select: classes.select }} // Apply custom style to the select element
              MenuProps={{ classes: { paper: 'select-menu-paper' } }} // Apply custom class to the menu paper

            >
                <MenuItem value={'usd'}>USD</MenuItem>
                <MenuItem value={'inr'}>INR</MenuItem>
              </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
