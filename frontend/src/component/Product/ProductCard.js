import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';
import usestyles from './styles';

const ProductCard = ({ product }) => {
    const classes = usestyles();
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.ratings,
        isHalf: true
    }

    return (<>
        <Link to={`/product/${product._id}`} className={classes.links}>
            <Card className={classes.Card}>
                <CardMedia
                    className={classes.image}
                    image={product.image[0].url}
                    title="green iguana"
                />
                <CardContent>
                    {/* <Typography variant='h6' gutterBottom >{product.name}</Typography> */}
                    <Typography variant="h7"gutterBottom>{product.description}</Typography>
                    {/* <Box sx={{ display: "flex", marginTop:"8px"}} gutterBottom>
                        <ReactStars {...options}/>
                        <Typography sx={{paddingLeft:"10px"}}><span>({product.numOfReviews} Reviews)</span></Typography>
                    </Box> */}
                    
                    <Typography variant='h6' sx={{textAlign:"center"}}><b>Rs</b><span> {product.price}</span></Typography>
                </CardContent>
            </Card>
        </Link>
    </>)
}
export default ProductCard;