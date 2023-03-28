import React, { useState, useEffect } from 'react'
import './totalcartitems.css';


function Totalcartitems({ cartItems, handleIncrementQuantity, handleDecrementQuantity, handleRemoveFromCart }) {
    const items = cartItems;
    const [totalPrice, setTotalPrice] = useState(0);
    console.log(cartItems, "here are cart items");

    useEffect(() => {
        let total = 0;
        cartItems.forEach(item => {
            total += item.quantity * item.price;
        });
        setTotalPrice(total);
    }, [cartItems]);



    return (
        <div className='maincartitemsblock'>
            <h1>Shopping Cart</h1>
            <div className='main-cart' style={{ display: "flex", width: "100%" }}>
                <div className='cart-items1' style={{ width: "100%" }}>
                    {items?.map((item, index) => <div key={index} className="maindiv">
                        <img src={item.images[0]} alt="productimges" />
                        <div className='maincard'>
                            <div className='cardtitle'>{item.title.slice(0, 25)} </div>
                            <div className="cardpricecategory">
                                <div className="cardcategory" style={{ color: "grey" }}>{item.category}</div></div>
                            <div className="carddescription"> {item.description.slice(0, 40)}....<span >Read more</span>
                            </div>
                            <div className='priceandquantity' style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                                <div className="cart-item-quantity" >
                                    <span className='cardpricemainblock'>
                                        <div className="cardprice">  {item.price * item.quantity}$</div></span>
                                    <button onClick={() => handleIncrementQuantity(item.id)} className="btn">-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => handleDecrementQuantity(item.id)} className="btn">+</button>
                                </div>
                                <button onClick={() => handleRemoveFromCart(item.id)} className='removefromcart'>Remove</button>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
                <div className='abc'>
                    <div className='total-items' >
                        <div className='price-detailsmain' style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", margin: "5px", padding: "15px", justifyContent: "flex-start", backgroundColor: "white", borderRadius: "5px", height: "100%", width: "90%" }}>
                            <span className='price-details' style={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-start" }}>PRICE DETAILS</span>
                            <div className="totalamountmain" >
                                <div className='totalamount'>Total Amount: {totalPrice}</div>
                            </div>
                            <button className="proceed-to-checkout">Proceeed to Checkout</button>
                        </div>
                    </div>

                </div>

            </div>


        </div>
    );
}

export default Totalcartitems


