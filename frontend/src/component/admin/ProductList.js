import React, { Fragment, useEffect } from "react";
import { Table, TableHead, TableRow, TableCell, makeStyles,TableBody , Link, Typography, Paper, IconButton} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../../actions/productAction";

import { useAlert } from "react-alert";

import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  heading: {
    display: "flex",
    justifyContent: "center",
    fontSize: "2vmax",
    marginTop: "3vmax",
    color:"#0f589f"
  },
  table: {
    marginTop: theme.spacing(3),

    '& thead th': {
      fontWeight: '600',
      color: "#0f589f",
      backgroundColor:"rgb(237 237 237)",
      textAlign:"left",
      fontSize: '1vmax'

    },
    '& tbody td': {
      fontWeight: '400',
      textAlign:"left",
      fontSize: '0.9vmax'
    },
    '& tbody tr td': {
      fontWeight: '300',
      height: '40',
      textAlign:"left",
      color:"black",
      fontSize: '0.9vmax'
    },
    '& tbody tr:hover': {
      backgroundColor: '#fffbf2',
      cursor: 'pointer',
    },
  },
  container: {
    height: "80vh",
    width:"100%",
    display:"flex",
    justifyContent:"center",
    backgroundColor:'smoke'
  },
  paperpadding :{
    margin:"1vmax"
  }
}));


const ProductList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const alert = useAlert();

  const { error, products } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
   dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Product Deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch , alert, deleteError,isDeleted, navigate]);

  

  return (
    <Fragment>
    <MetaData title={`ALL PRODUCTS - Admin`} />

    <div className="dashboard">
      <SideBar />
      <div className="productListContainer">
        <h1 className={classes.heading}>ALL PRODUCTS</h1>
        <Paper elevation={2} sx={{width:"100%"}} className={classes.paperpadding}>
            <Table aria-label="simple table" className={classes.table}>
              <TableHead className={classes.table}>
                <TableRow>
                  <TableCell align="right">Product ID</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Stock</TableCell>
                  <TableCell align="right">Edit</TableCell>
                  <TableCell align="right">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products && products.map((product, idx) => (
                  <TableRow key={idx}>
                    <TableCell align="right">{product._id}</TableCell>
                    <TableCell align="right" sx={{fontSize:100}} >{product.name}</TableCell>
                    <TableCell align="right">{product.price}</TableCell>
                    <TableCell align="right">{product.stock}</TableCell>
                    <TableCell align="right">
                      <Link variant="inherit" underline="none" component={RouterLink } sx={{ display: "flex" }} to={`/admin/product/${product._id}`}>
                        <Typography sx={{ paddingLeft: 0.4, paddingTop: 0.7 }}><b><EditIcon/></b></Typography>
                      </Link>
                    </TableCell>
                    <TableCell align="right">
                      <Link variant="inherit" underline="none" component={RouterLink } sx={{ display: "flex" , color:"red"}}>
                        <IconButton  onClick={()=>{deleteProductHandler(product._id)}}><DeleteIcon color="error"/></IconButton>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
      </div>
    </div>
  </Fragment>
  );
};

export default ProductList;