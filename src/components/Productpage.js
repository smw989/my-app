import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import ProductList from './ProductList';
import Cart from './Cart';
import Footer from './Footer';

const Productpage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      fetchProducts();
    }

    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const fetchProducts = () => {
    fetch('http://localhost:5000/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  };

  const addToCart = (product) => {
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    if (existingItemIndex !== -1) {
      const updatedCartItems = cartItems.map((item, index) => {
        if (index === existingItemIndex) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === productId) {
        if (item.quantity === 1) {
          return null; 
        } else {
          return { ...item, quantity: item.quantity - 1 }; 
        }
      }
      return item;
    }).filter(item => item !== null); // Filter out null entries to remove removed items from cart

    setCartItems(updatedCartItems);
  };

  return (
    <div>
      <Header />
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <ProductList products={products} onAddToCart={addToCart} />
        <Cart cartItems={cartItems} onRemove={removeFromCart} />
      </div>
      <Footer />
    </div>
  );
};

export default Productpage;