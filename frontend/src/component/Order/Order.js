import React, { useState } from 'react'
import { Table, TableHead, TableRow, TableCell, makeStyles, Paper } from '@material-ui/core'
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import { useParams } from "react-router-dom";
import { Box } from '@mui/material';

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
      textAlign: "center",
      color: "black"
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
    borderRadius: "30px"
  }
}));

const order = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let { id } = useParams();
  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, alert, error]);
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
                <Typography variant="h4">Shipping Information</Typography>
                <Table aria-label="simple table" className={classes.table}>
                  <TableHead className={classes.table}>
                    <TableRow>
                      <TableCell>S.No</TableCell>
                      <TableCell align="right">Order Id</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Amount&nbsp;($)</TableCell>
                      <TableCell align="right">Status</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders && orders.map((item, idx) => (
                      <TableRow key={row.idx}>
                        <TableCell align="right">{item._id}</TableCell>
                        <TableCell align="right">{item.orderItems.length}</TableCell>
                        <TableCell align="right">{item.totalPrice}</TableCell>
                        <TableCell align="right">{item.orderStatus}</TableCell>
                        <TableCell align="right"><Box>
                          Edit
                        </Box></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>


              </Paper>

            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
export default order;