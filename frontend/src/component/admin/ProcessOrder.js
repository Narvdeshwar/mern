import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { Table, TableHead, TableRow, TableCell, makeStyles,TableBody, Link, Typography, Paper} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import SideBar from "./Sidebar";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstant";
import "./processOrder.css";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { useNavigate, useParams } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  paperpadding: {
    margin: "2vmax",
    borderRadius:"30px",
    padding:"3vmax"
  },
  heading: {
    display: "flex",
    justifyContent: "center",
    fontSize: "2vmax",
    marginTop: "3vmax",
    color: "#0f589f"
  },
  table: {
    marginTop: theme.spacing(3),

    '& thead th': {
      fontWeight: '600',

      color: "#1976d2",
      backgroundColor: "rgb(237 237 237)",
      textAlign: "center"

    },
    '& tbody td': {
      fontWeight: '400',
      textAlign: "center"
    },
    '& tbody tr td': {
      fontWeight: '300',
      height: '40',
      textAlign: "center"
    },
    '& tbody tr:hover': {
      backgroundColor: '#fffbf2',
      cursor: 'pointer',
    },
  },
  green:{
    color:"green"
  },
  red :{
    color :"red"
  }
}));

const ProcessOrder = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("status", status);
    dispatch(updateOrder(id, myForm));
  };

  const dispatch = useDispatch();
  const alert = useAlert();

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id, isUpdated, updateError]);

  return (
    <Fragment>
      
      <MetaData title="Process Order" />
      <div className="dashboard">
        <SideBar />
        <Paper elevation={2} className={classes.paperpadding}>
        <div className="">
          {loading ? (
            <Loader />
          ) : (<>
            <div
                style={{
                  display: order.orderStatus === "Delivered" ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1 className={classes.heading}>Process Order</h1>
                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {order.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </Button>
                </form>
              </div>
          <Typography variant="h6"className={classes.heading}>Shipping Information</Typography>
                <Table aria-label="simple table" className={classes.table}>
                  <TableHead className={classes.table}>
                    <TableRow>
                      <TableCell align="right">Customer Name</TableCell>
                      <TableCell align="right">{order.user && order.user.name}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell align="right">Contact Number</TableCell>
                      <TableCell align="right">  {order.shippingInfo && order.shippingInfo.phoneNo}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="right">Address</TableCell>
                      <TableCell align="center"> {order.shippingInfo &&
                        `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="right">Paid</TableCell>
                      <TableCell align="center"> <b>{order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                        ? "PAID"
                        : "NOT PAID"}</b></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="center">{order.totalPrice && order.totalPrice}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="right">Order Status</TableCell>
                      <TableCell align="center"  className={
                            order.orderStatus && order.orderStatus === "Delivered"
                              ? classes.green
                              : classes.red
                          }
                        ><b>{order.orderStatus && order.orderStatus}</b></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <div className="confirmCartItems">
                  <Typography className={classes.heading}>Your Cart Items:</Typography>
                  <div className="confirmCartItemsContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>{" "}
                          <span>
                            {item.quantity} X ₹{item.price} ={" "}
                            <b>₹{item.price * item.quantity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              
          
          </>)
          }
        </div>
      </Paper>
      </div>
     
    </Fragment>
  );
};

export default ProcessOrder;