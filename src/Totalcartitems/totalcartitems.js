import React from 'react'
import './totalcartitems.css';



function Totalcartitems({ cartItems, handleIncrementQuantity, handleDecrementQuantity }) {
    const items = cartItems;
    console.log(cartItems, "here are cart items");

    return (
        <div className='maincartitemsblock'>
            <h1>Here is your updated cart items</h1>
            <div className='main-cart' style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <div className='cart-items1' >
                    {items?.map((item, index) => <div key={index} className="maindiv" style={{ display: "flex", textAlign: "center", backgroundColor: "white", justifyContent: "space-between" }}>
                        <img src={item.images[0]} alt="" style={{ height: "100px", width: "100px", margin: "10px" }} />
                        <div className='maincard' style={{ textAlign: "start" }}>
                            <div className='cardtitle'>{item.title.slice(0, 25)}</div>
                            <div className="cardpricecategory">
                                <div className="cardprice"> {item.price}  $</div>
                                <div className="cardcategory" style={{ color: "grey" }}>{item.category}</div></div>
                            <div className="carddescription"> {item.description.slice(0, 50)}....<span>Read more</span>
                            </div>

                        </div>
                        <div className="cart-item-quantity">
                            <button onClick={() => handleIncrementQuantity(item)}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => handleDecrementQuantity(item)}>+</button>
                        </div>
                    </div>


                    )}
                </div>

                <div className='abcd' style={{ display: "flex", alignItems: "flex-start" }}>
                    <div className='total-items' style={{ display: "flex", flexDirection: "column", padding: "0px 0px 0px 16px", display: "flex", alignItems: "flex-start", textAlign: "start", width: "100%", height: "30%" }}>
                        <span className='price-details'>PRICE DETAILS</span>
                        <hr id='horizonatalline'></hr>
                        <div style={{ padding: "0px 24px" }}>
                            <div className='price' style={{ margin: "10px 0px", fontSize: "20px", fontWeight: "initial" }}>Price</div>
                            <div className='discount' style={{ margin: "10px 0px", fontSize: "20px", fontWeight: "initial" }}>Discount</div>
                            <div className='Deliverycharges' style={{ margin: "10px 0px", fontSize: "20px", fontWeight: "initial" }}>Delivery Charges</div>
                            <div className='totalamount' style={{ padding: "10px 0px", margin: "10px 0px", }}>Total Amount</div>
                            <div className='saveamount'>You will save ₹11,791 on this order</div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default Totalcartitems


