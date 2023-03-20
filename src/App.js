import React, { useState, useEffect, useReducer } from 'react'
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home /Home';
import Totalcartitems from './Totalcartitems/totalcartitems';

const initialState = {
  cartItems: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, cartItems: [...state.cartItems, action.payload] };
    case 'REMOVE_FROM_CART':
      return { ...state, cartItems: state.cartItems.filter((item) => item.id !== action.payloadId) };
    case 'INCREMENT_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payloadId ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    case 'DECREMENT_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payloadId ? { ...item, quantity: item.quantity - 1 } : item
        ),
      };
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
};


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
  }, [data?.total]);

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

  const handleRemoveFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payloadId: productId });


  };

  const handleIncrementQuantity = (productId) => {
    dispatch({ type: 'INCREMENT_QUANTITY', payloadId: productId });
  };

  const handleDecrementQuantity = (productId) => {
    dispatch({ type: 'DECREMENT_QUANTITY', payloadId: productId });
  };

  return (
    <Routes>
      <Route path='/' element={<Home cartItems={cartItems} handleAddToCart={handleAddToCart} handleNextClick={handleNextClick} handlePrevClick={handlePrevClick}
        handleRemoveFromCart={handleRemoveFromCart} currentPage={currentPage} handlePageClick={handlePageClick} data={data} totalPages={totalPages} handleDecrementQuantity={handleDecrementQuantity} handleIncrementQuantity={handleIncrementQuantity} />} />
      <Route path='/cart'
        element={<Totalcartitems handleIncrementQuantity={handleIncrementQuantity} handleDecrementQuantity={handleDecrementQuantity} cartItems={cartItems} />} />
    </Routes>
  )
}

export default App;
