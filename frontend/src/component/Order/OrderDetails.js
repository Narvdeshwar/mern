import React, { Fragment, useEffect } from "react";
import "./OrderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Table, TableHead, TableRow, TableCell, makeStyles, TableBody, Link, Typography, Paper} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";

const useStyles = makeStyles(theme => ({
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
  container: {
    height: "80vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    backgroundColor: 'smoke'
  },
  paperpadding: {
    margin: "1vmax",
    borderRadius:"30px"
  },
  green:{
    color:"green"
  },
  red :{
    color :"red"
  }
}));

const OrderDetails = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Order Details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
            <h1 className={classes.heading}>Order Number #{order && order._id}</h1>
              <Paper elevation={2} className={classes.paperpadding}>
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
                      <TableCell align="right"> {order.shippingInfo && order.shippingInfo.phoneNo}</TableCell>
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
                <div className="orderDetailsCartItems">
                  <Typography>Order Items:</Typography>
                  <div className="orderDetailsCartItemsContainer">
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

              </Paper>

            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;