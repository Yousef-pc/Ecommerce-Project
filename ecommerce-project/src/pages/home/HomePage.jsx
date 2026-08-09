import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Header } from '../../components/Header';
import { ProductsGrid } from './productsGrid';
import './HomePage.css';

export function HomePage({ cart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products')
      .then((response) => {
        setProducts(response.data);
      });
  }, []);

  return (
    <>
      <link rel="icon" href="/images/home-favicon.png" />

      <title>Ecommerce Project</title>

      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} />
      </div>
    </>
  );
}