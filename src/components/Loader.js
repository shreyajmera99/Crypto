import React from 'react'
import '../App.css'; // Import the CSS file
import {CircularProgress, } from '@mui/material';

export default function Loader() {
  return (
    <div className='loader'>
    <CircularProgress
      style={{ color: "black" }}
      size={250}
      thickness={1}
    />
  </div>
  )
}
