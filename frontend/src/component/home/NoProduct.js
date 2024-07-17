import { Paper,Typography } from '@material-ui/core';
import './noproduct.css';
import React from 'react';

const NoProduct=()=>{
    return(<>
      <div className="noproduct">
      <Typography variant='h3'>No Product Found</Typography>
    </div>
    </>)
}

export default NoProduct;