import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import "chart.js/auto";
import { Link, Badge, Typography,Paper } from "@mui/material";
import { Line, Doughnut } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import MetaData from "../layout/MetaData";
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  heading: {
    display: "flex",
    justifyContent: "center",
    fontSize: "2vmax",
    marginTop: "3vmax",
    color:"#0f589f"
  }
 
}));
const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);


  const totalsum = orders && orders.reduce((accumulator, curValue) => accumulator + curValue.totalPrice, 0)
  const saleRoundedNumber = Math.round(totalsum * 100) / 100; 
  
  

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "MONTHLY TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0,saleRoundedNumber],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };


  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
      <h1 className={classes.heading}>DASHBOARD</h1>
        <div className='main-cards'>
         
          <Link variant="inherit" className='card' underline="none" component={RouterLink} to='/admin/users'>
            <div className='card-inner'>
              <Typography variant="h5"><b>Users</b></Typography>
            </div>
            <h1>{users && users.length}</h1>
          </Link>
          
          <Link variant="inherit" className='card' underline="none" component={RouterLink} to='/admin/orders'>
            <div className='card-inner'>
              <Typography variant="h5"><b>Orders</b></Typography>
            </div>
            <h1>{orders && orders.length}</h1>
          </Link>
          <Link variant="inherit" className='card' underline="none" component={RouterLink} to='/admin/products'>
            <div className='card-inner'>
              <Typography variant="h5"><b>Products</b></Typography>
            </div>
            <h1>{products && products.length}</h1>
          </Link>
          <Link variant="inherit" className='card' underline="none" component={RouterLink} to='/admin/orders'>
            <div className='card-inner'>
              <Typography variant="h5"><b>Sales</b></Typography>
            </div>
            <h1>{orders && saleRoundedNumber}</h1>
          </Link>
        </div>

        <div className="chart-area">
          <div className="lineChart">
            <Line data={lineState} />
          </div>

          <div className="doughnutChart">
            <Doughnut data={doughnutState} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;