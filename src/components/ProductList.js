import React, { useEffect, useState } from 'react';
import Product from './Product';

const ProductList = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]); // State to hold products

  useEffect(() => {
    // Fetch products from your Flask API
    fetch('http://localhost:5000/products') // Make sure the port matches your Flask app
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []); // The empty array means this effect runs once on mount

  return (
    <div className="product-list">
      {products.map(product => (
        <Product key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
};

export default ProductList;
