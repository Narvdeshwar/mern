import React, { Fragment, useEffect } from "react";
import "./Cart.css";
import CartItemCard from "./CardItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cardAction";
import { Paper, Typography, makeStyles } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link, useNavigate } from "react-router-dom";


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
}));

const Cart = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.card);
  const {user} = useSelector((state)=>state.user);

  let ele = [];
  user && cartItems.forEach(element => {
    if(element.user == user.name){
       ele.push(element);
    }
  });
  if(cartItems.user == "default"){
    ele = cartItems;
  }
 

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty, user));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty, user));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

useEffect(()=>{

},[]);
  return (
   <Paper elevation={2} className={classes.paperpadding}>
      <Fragment>
      {ele.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
          
          <div className="cartPage">
          <h1 className={classes.heading}>View Orders</h1>
            <div className="cartHeader">
              <p><b>Products</b></p>
              <p><b>Quantity</b></p>
              <p><b>SubTotal</b></p>
            </div>

            {ele &&
              ele.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                  <div className="cartInput">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">{`₹${
                    item.price * item.quantity
                  }`}</p>
                </div> 
              ))}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>{`₹${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </Fragment>
       )}
    </Fragment>
   </Paper>
  );
};

export default Cart;