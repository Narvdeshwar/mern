import React, { useEffect } from 'react';
import { Button, Container, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../actions/productAction';
import { useAlert } from "react-alert";
import { Grid, item } from '@material-ui/core';
import './home.css';
import Loader from '../layout/Loader/Loader';
import PropTypes from "prop-types";
import Owl from './Owl';
import NoProduct from './NoProduct';
import ProductCard from '../Product/ProductCard';

const Home = ({ text }) => {

  const alert = useAlert();
  const dispatch = useDispatch();
  var { products, error, isloading } = useSelector(state => state.products);

  const searchProduct = products && products.filter((ele) => {
    return text.toLowerCase() === ''
      ? ele
      : ele.name.toLowerCase().includes(text);
  })

  if (text) {
    products = searchProduct;
  }
  useEffect(() => {
    if (error) {
      alert.error(error)
    }
    dispatch(getProduct());

  }, []);
  return (<>
    {isloading ? (<Loader />) : (<>

      <MetaData title="Ecommerce" />
      <div className="container">
        {!text ? (<>
          <div id="myCarousel" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
              <div className="item active">
                <Link to='/products/lists'>
                  <img src="https://images.bestsellerclothing.in/live/image/catalog/brandstore/bestseller/banners/vm_ss_web_14022024.webp" />
                </Link>
              </div>

              <div className="item">
                <Link to='/products/lists'>
                  <img src="https://images.bestsellerclothing.in/live/image/catalog/brandstore/bestseller/banners/vmg_web_summer_27032024.png" />
                </Link>
              </div>
            </div>
            <a className="left carousel-control" href="#myCarousel" data-slide="prev">
              <span className="glyphicon glyphicon-chevron-left"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="right carousel-control" href="#myCarousel" data-slide="next">
              <span className="glyphicon glyphicon-chevron-right"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
          <h1 className='best_seller_heading'>bestseller</h1>
          <Owl></Owl>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Link to='/products/lists'>
                <img src="https://images.bestsellerclothing.in/live/image/catalog/brandstore/bestseller/banners/vm_denim_web_19032024.jpg?sw=1600" width='100%' />
              </Link>
            </Grid>
            <Grid item xs={12} md={4}>
              <Link to='/products/lists'>
                <img src="https://images.bestsellerclothing.in/live/image/catalog/brandstore/bestseller/banners/vm_tile-Dresses-SS24_28022024.png" width='100%' height='590px' />
              </Link>
            </Grid>
            <Grid item xs={12} md={4}>
              <Link to='/products/lists'>
                <img src="https://images.bestsellerclothing.in/live/image/catalog/brandstore/bestseller/banners/vm_tile-Top-&-tees-SS24_28022024.png" width='100%' height='590px' />
              </Link>
            </Grid>
            <Grid item xs={12} md={4}>
              <Link to='/products/lists'>
                <img src="https://images.bestsellerclothing.in/live/image/catalog/brandstore/bestseller/banners/vm_tile-Shirts-SS24_28022024.png" width='100%' height='590px' />
              </Link>
            </Grid>
            <Grid item xs={12} md={4}>
              <Link to='/products/lists'>
                <img src="https://images.bestsellerclothing.in/live/image/catalog/brandstore/bestseller/banners/vm_tile-Co-ord-Sets-SS24_28022024.png" width='100%' />
              </Link>
            </Grid>

            <Grid item xs={12} md={4}>
              <Link to='/products/lists'>
                <img src="https://images.bestsellerclothing.in/live/image/catalog/brandstore/bestseller/banners/vm_tile-pants-SS24_28022024.png" width='100%' />
              </Link>
            </Grid>
            <Grid item xs={12} md={4}>
              <Link to='/products/lists'>
                <img src="https://images.bestsellerclothing.in/live/image/catalog/brandstore/bestseller/banners/vm_tile-Denim-SS24_28022024.png" width='100%' />
              </Link>
            </Grid>
          </Grid>
        </>) : (<>
          <Container maxWidth='xl' sx={{ height: "80h" }}>
            {(searchProduct.length !== 0) ? (<> <div className='main_container'>
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div></>) : (<><NoProduct /></>)}

          </Container>
        </>)}

      </div>

    </>)
    }
  </>)
}
Home.propTypes = {
  text: PropTypes.string.isRequired,

};


export default Home;