import { Link, useParams } from 'react-router';
import axios from 'axios';
import dayjs from 'dayjs';
import './tracking.css';
import { Header } from '../../components/Header';
import { useEffect, useState } from 'react';

export function TrackingPage({ cart, products }) {
    const params = useParams();
    const { orderId, productId } = params;
    const [order, setTracking] = useState(null);

    useEffect(() => {
        axios.get(`/api/orders/${orderId}?expand=products`).then((response) => {
            setTracking(response.data);
        });
    }, [orderId]);

    if (!order) {return null; }

    const product = products.find(
        (product) => product.id === productId
    );

  const orderProduct = order.products?.find((p) => p.productId === productId) || {};


  const orderTimeMs = order.orderTimeMs || 0;
  const estimatedDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs || order.estimatedDeliveryTimeMs || 0;
  const totalDeliveryTimeMs = estimatedDeliveryTimeMs - orderTimeMs;
  const timePassedMs = dayjs().valueOf() - orderTimeMs;

  let percentage = 0;
  if (totalDeliveryTimeMs > 0) {
    percentage = (timePassedMs / totalDeliveryTimeMs) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
  }

    return (
        <>
            <Header cart={cart} />

            <div key={orderId} className="tracking-page">
                <div className="order-tracking">
                    <Link className="back-to-orders-link link-primary" to="/orders">
                        View all orders
                    </Link>

                    <div className="delivery-date">
                        Arriving on {dayjs(order.estimatedDeliveryTimeMs).format('MMMM, D')}
                    </div>

                    <div className="product-info">
                        {product.name}
                    </div>

                    <div className="product-info">
                        Quantity: 1
                    </div>

                    <img className="product-image" src={product.image} />

                    <div className="progress-labels-container">
                        <div className="progress-label">
                            Preparing
                        </div>
                        <div className="progress-label current-status">
                            Shipped
                        </div>
                        <div className="progress-label">
                            Delivered
                        </div>
                    </div>

                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{width: `${percentage}%`}}></div>
                    </div>
                </div>
            </div>
        </>
    );
}