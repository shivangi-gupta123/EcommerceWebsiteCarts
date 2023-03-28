import { useState, useEffect, useReducer } from 'react'
import { Link } from 'react-router-dom';
import "./Home.css"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


const Home = (props) => {

    const { handleAddToCart, handleNextClick, handlePageClick, handlePrevClick, handleRemoveFromCart, currentPage, totalPages, cartItems, data, quantity } = props

    if (!data) {
        return <h1>Loading....</h1>;
    }

    console.log("lets check cartItems ==>", cartItems)


    return (

        <div className="App">
            <div className="">
                <div className='header'>
                    <h1> Online Shopping Store </h1>
                    <div className='tci'>
                        <div className='cartitemlength' >
                            {cartItems.length}</div>
                        <Link to="/cart">
                            <ShoppingCartIcon className='shoppingcarticon'></ShoppingCartIcon>
                        </Link>
                    </div>
                </div>

                <img src="banner1.jpg"></img>

                {/* <h1 style={{ display: "flex", color: "black", fontSize: "40px", justifyContent: "center", fontFamily: "sans-serif", flexWrap: 'wrap' }}>Explore our Products</h1> */}

                <div className="productwrapper">
                    {data &&
                        data?.products.slice(currentPage * 10 - 10, currentPage * 10).map((product, index) => (
                            <div key={index} className="main">
                                <div className='image'>
                                    <img src={product.images[0]} className="productimages" alt="image" /></div>
                                <div className="card1">{product.title.slice(0, 25)} </div>
                                <div className="pricecategory">
                                    <div className="card2">$ {product.price}</div>
                                    <div className="card3">{product.category}</div></div>
                                <div className="card4"> {product.description.slice(0, 12)}....<span>Read more</span>
                                </div>
                                <div className='button'>

                                    {cartItems.some((pd) => pd.id == product.id) > 0 ? (
                                        <button
                                            className='btn2 '
                                            onClick={() => handleRemoveFromCart(product.id)}
                                        >
                                            Remove from cart
                                        </button>
                                    ) :
                                        <button className='btn1' onClick={() => handleAddToCart(product)}>
                                            Add to Cart
                                        </button>}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            {
                totalPages && (
                    <div className='totalpages'>

                        <button onClick={handlePrevClick} disabled={currentPage === 1} style={{ height: "44px", border: "1px solid transparent" }}><ArrowBackIcon></ArrowBackIcon></button>
                        {[...Array(totalPages)].map((index, item) => {
                            return (
                                <div className='pagination'>
                                    <div className={`onclick ${currentPage === item + 1 && 'selected'}`} onClick={() => handlePageClick(item + 1)} style={{ cursor: "pointer", color: "black", float: "left", padding: "12px 20px", textDecoration: "none", }}>{item + 1}</div>
                                </div>
                            );
                        })}
                        <button onClick={handleNextClick} disabled={currentPage === 10} style={{ height: "44px", border: "1px solid transparent" }}><ArrowForwardIcon></ArrowForwardIcon></button>
                    </div>
                )
            }
        </div>
    );
}

export default Home


