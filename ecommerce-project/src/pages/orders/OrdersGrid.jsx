import { Fragment } from "react";
import { Link } from "react-router";
import { OrdersGridHeader } from "./OrdersGridHeader";
import { OrdersGridDetails } from "./OrdersGridDetails";

export function OrdersGrid({ orders }) {
  return (
    <div className="orders-grid">
      {orders.map((order) => {
        return (
          <div key={order.id} className="order-container">

            <OrdersGridHeader order={order} />

            <OrdersGridDetails order={order} />
          </div>
        );
      })}
    </div>
  );
}