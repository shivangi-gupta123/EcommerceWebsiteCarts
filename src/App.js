import React, { useState, useEffect, useReducer } from 'react'
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home /Home';
import Totalcartitems from './Totalcartitems/totalcartitems';

const initialState = {
  cartItems: [],
};

function cartReducer(state, action) {
  console.log("action is ==> ", action);
  switch (action.type) {
    case 'ADD_TO_CART':
      if (state.cartItems.find((item) => item.id === action.payload.id)) {
        const allProducts = state.cartItems.map((item) => {
          if (item.id === action.payload.id) {
            item.quantity = item.quantity + 1;
          }
          return item;
        });

        return { ...state, cartItems: allProducts };
      } else {
        const item = { ...action.payload };
        item.quantity = 1;
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    case 'REMOVE_FROM_CART':
      const updatedCartItems = state.cartItems.map((item) => {
        if (item.id === action.payload) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return null;
          }
        } else {
          return item;
        }
      }).filter(item => item !== null);
      return { ...state, cartItems: updatedCartItems };


    // return { ...state, cartItems: state.cartItems.filter((item) => item.id !== action.payload) };
    case 'INCREMENT_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payloadId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case 'DECREMENT_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payloadId
            ? {
              ...item,
              quantity: item.quantity > 1 ? item.quantity - 1 : 1,
            }
            : item
        ),
      };
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
}




// console.log(initialState.quantity, "shivangi");

function App() {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const postsPerPage = 10;
  const { cartItems } = state;
  console.log(cartItems, 'safdasdfsadf')

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=100")
      .then((res) => res.json())
      .then((data) => setData(data));
    setTotalPages(data?.total / postsPerPage);
  }, [data?.totalPages]);

  const handlePageClick = (val) => {
    setCurrentPage(val);
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleAddToCart = (product) => {
    const isAlreadyInCart = cartItems.some((item) => item.id === product.id);
    if (!isAlreadyInCart) {
      dispatch({ type: 'ADD_TO_CART', payload: product });
    }
  };
  console.log(cartItems);


  const handleRemoveItem = (id) => cartItems.filter((item) => item.id !== id);


  console.log(cartItems, "here are items")


  const handleRemoveFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const handleDecrementQuantity = (productId) => {
    dispatch({ type: 'INCREMENT_QUANTITY', payloadId: productId });
  };

  const handleIncrementQuantity = (productId) => {
    dispatch({ type: 'DECREMENT_QUANTITY', payloadId: productId });
  };

  return (
    <Routes>
      <Route path='/' element={<Home cartItems={cartItems} handleAddToCart={handleAddToCart} handleNextClick={handleNextClick} handlePrevClick={handlePrevClick}
        handleRemoveFromCart={handleRemoveFromCart} currentPage={currentPage} handlePageClick={handlePageClick} data={data} totalPages={totalPages} handleDecrementQuantity={handleDecrementQuantity} handleIncrementQuantity={handleIncrementQuantity} />} />
      <Route path='/cart'
        element={<Totalcartitems handleIncrementQuantity={handleIncrementQuantity} handleDecrementQuantity={handleDecrementQuantity} handleRemoveItem={handleRemoveItem} cartItems={cartItems} />} />
    </Routes>
  )
}

export default App;
