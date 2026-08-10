import axios from 'axios';
import dayjs from 'dayjs';
import { Link } from 'react-router';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Header } from "../components/Header";
import './TrackingPage.css';

export function TrackingPage({ cart }) {
  const {orderId, productId} = useParams();

  const [orderData, setorderData] = useState(null);

  let selectedProductDetails;

  useEffect(() => {
    const fetchOrderData = async () => {
      const response = await axios.get(`/api/orders/${orderId}?expand=products`);
      setorderData(response.data);
    }

    fetchOrderData();
  }, [orderId]);

  if (!orderData) return null;

  if (orderData) {
    selectedProductDetails = orderData.products.find((productOrder) => {
      return productId === productOrder.product.id;
    });
  }

  const totalDeliveryTimeMs = selectedProductDetails.estimatedDeliveryTimeMs - orderData.orderTimeMs;

  const timePassedMs = dayjs().valueOf() - orderData.orderTimeMs;

  const deliveryProgressPercentage = (timePassedMs / totalDeliveryTimeMs) * 100;

  return (
    <>
      <link rel="icon" href="/images/tracking-favicon.png" />

      <title>Tracking</title>

      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            Arriving on {
              dayjs(selectedProductDetails.estimatedDeliveryTimeMs).format('dddd, MMMM D')
            } 
          </div>

          <div className="product-info">
            {selectedProductDetails.product.name}
          </div>

          <div className="product-info">
            Quantity: {selectedProductDetails.quantity}
          </div>

          <img className="product-image" src={selectedProductDetails.product.image} />

          <div className="progress-labels-container">
            <div className={`progress-label ${deliveryProgressPercentage < 33 && "current-status"}`}>
              Preparing
            </div>
            <div className={`progress-label ${(deliveryProgressPercentage >= 33 && deliveryProgressPercentage < 100) && "current-status"}`}>
              Shipped
            </div>
            <div className={`progress-label ${deliveryProgressPercentage >= 100 && "current-status"}`}>
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar" style={{width: `${deliveryProgressPercentage}%`}}></div>
          </div>
        </div>
      </div>
    </>
  );
}