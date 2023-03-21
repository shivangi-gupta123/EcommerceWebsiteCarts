import React, { useState, useEffect } from 'react'
import './totalcartitems.css';




function Totalcartitems({ cartItems, handleIncrementQuantity, handleDecrementQuantity, handleRemoveItem }) {
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
        <div className='maincartitemsblock' style={{}}>
            <h1>Here is your updated cart items</h1>
            <div className='main-cart' style={{ display: "flex", justifyContent: "center" }}>
                <div className='cart-items1' >
                    {items?.map((item, index) => <div key={index} className="maindiv" style={{ display: "flex", textAlign: "center" }}>
                        <img src={item.images[0]} alt="" style={{ height: "100px", width: "100px", margin: "20px" }} />
                        <div className='maincard' style={{ textAlign: "start", backgroundColor: "white", justifyContent: "space-between" }}>
                            <div className='cardtitle'>{item.title.slice(0, 25)}</div>
                            <div className="cardpricecategory">
                                <div className="cardcategory" style={{ color: "grey" }}>{item.category}</div></div>
                            <div className="carddescription"> {item.description.slice(0, 50)}....
                            </div>
                        </div>

                        <span style={{ display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
                            <div className="cardprice" style={{ margin: "40px" }}>{item.price * item.quantity}$</div></span>

                        <div className="cart-item-quantity" style={{ margin: "10px" }}>
                            <button onClick={() => handleIncrementQuantity(item.id)} className="btn">-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => handleDecrementQuantity(item.id)} className="btn">+</button>
                        </div>

                        <button onClick={() => handleRemoveItem(item.id)} className='removefromcart' style={{ margin: "55px 15px", border: "1px solid transparent", backgroundColor: "#129913", borderRadius: "5px", color: "white", textTransform: "uppercase", cursor: "pointer" }}>Remove </button>
                    </div>


                    )}
                </div>

            </div>

            <div className='abc' style={{ width: "60%", margin: "auto" }}>
                <div className='total-items' style={{ display: "flex", flexDirection: "column", padding: "0px 0px 0px 16px", alignItems: "end", textAlign: "end", width: "100%", height: "30%" }}>
                    <span className='price-details'>PRICE DETAILS</span>
                    <div style={{ padding: "0px 24px" }}>
                        <div className='totalamount' style={{ padding: "10px 0px", margin: "10px 0px", }}>Total Amount: {totalPrice}</div>
                    </div>



                </div>

            </div>
        </div>
    );
}

export default Totalcartitems


