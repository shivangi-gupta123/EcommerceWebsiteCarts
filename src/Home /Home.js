import { useState, useEffect, useReducer } from 'react'
import { Link } from 'react-router-dom';
import "./Home.css"


const Home = (props) => {

    const { handleAddToCart, handleNextClick, handlePageClick, handlePrevClick, handleRemoveFromCart, currentPage, totalPages, cartItems, data, quantity = 1 } = props

    if (!data) {
        return <h1>Loading....</h1>;
    }


    return (

        <div className="App">
            <div className="">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                    <h1 style={{ fontFamily: "serif " }}> Fetch data from an api in react </h1> <div className='tci'>
                        <Link to="/cart">
                            <button className='gotocart'>Go to Cart({cartItems.length})</button>
                        </Link>
                    </div></div>

                <div className="productwrapper">
                    {data &&
                        data?.products.slice(currentPage * 10 - 10, currentPage * 10).map((product, index) => (
                            <div key={index} className="main" style={{ margin: "0.5rem", border: "1px solid trasparent", width: "282px", textAlign: "center", backgroundColor: "white" }}>
                                <img src={product.images[0]} alt="" style={{ width: "10rem", height: "10rem", padding: "20px" }} />
                                <div className="card1" style={{ display: "flex", justifyContent: "left", padding: "8px" }}>{product.title.slice(0, 25)} </div>
                                <div className="pricecategory" style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div className="card2"> {product.price}  $</div>
                                    <div className="card3">{product.category}</div></div>
                                <div className="card4"> {product.description.slice(0, 50)}....<span>Read more</span>
                                </div>
                                <div className='button'>

                                    {cartItems.some((pd) => pd.id == product.id) > 0 ? (
                                        <button
                                            className='btn2 '
                                            onClick={() => handleRemoveFromCart(product.id)}
                                        >
                                            Remove from the cart
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
            {totalPages && (
                <div className='abcd' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>

                    <button onClick={handlePrevClick} disabled={currentPage === 1} style={{ height: "44px" }}>Prev</button>
                    {[...Array(totalPages)].map((index, item) => {
                        return (
                            <div style={{ display: "inline-block", border: "1px solid black", margin: "20px 0px" }}>
                                <div className={`onclick ${currentPage === item + 1 && 'selected'}`} onClick={() => handlePageClick(item + 1)} style={{ cursor: "pointer", color: "black", float: "left", padding: "12px 20px", textDecoration: "none", }}>{item + 1}</div>
                            </div>
                        );
                    })}
                    <button onClick={handleNextClick} disabled={currentPage === 10} style={{ height: "44px", }}>Next</button>
                </div>




            )}
        </div>
    );
}

export default Home


