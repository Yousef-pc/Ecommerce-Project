import axios from 'axios';
import { useSearchParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Header } from '../../components/Header';
import { ProductsGrid } from './productsGrid';
import './HomePage.css';

export function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);

  const [searchParams] = useSearchParams();
  
  const search = searchParams.get('search');

  useEffect(() => {
    if (!search) {
      const getHomeData = async () => {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      }

      getHomeData();
    }

    if (search) {
      const getFilteredHomeData = async () => {
        const response = await axios.get(`/api/products?search=${search}`);
        setProducts(response.data);
      }

      getFilteredHomeData();
    }
  }, [search]);



  return (
    <>
      <link rel="icon" href="/images/home-favicon.png" />

      <title>Ecommerce Project</title>

      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}