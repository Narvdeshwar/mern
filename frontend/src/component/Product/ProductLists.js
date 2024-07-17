import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../actions/productAction';
import ProductCard from '../Product/ProductCard';
import { Container } from '@mui/material';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import './ProductLists.css';
const ProductLists = () => {
  const dispatch = useDispatch();
  var { products, error, isloading } = useSelector(state => state.products);
  useEffect(() => {
    if (error) {
      alert.error(error)
    }
    dispatch(getProduct());
  }, []);
  return (<>
    {isloading ? (<Loader />) : (<>
      <MetaData title="Ecommerce" />
      <Container maxWidth='xl'>
        <div className='ProductList_container'>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

      </Container>
    </>)
    }
    </>);
}

    export default ProductLists;