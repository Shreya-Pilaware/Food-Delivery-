import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_ORDERS } from '../data/mockData';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('flavorcraft_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [activeOrder, setActiveOrder] = useState(() => {
    const saved = localStorage.getItem('flavorcraft_active_order');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('flavorcraft_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (activeOrder) {
      localStorage.setItem('flavorcraft_active_order', JSON.stringify(activeOrder));
    } else {
      localStorage.removeItem('flavorcraft_active_order');
    }
  }, [activeOrder]);

  const placeOrder = (orderPayload) => {
    const randomId = Math.floor(1000 + Math.random() * 9000);
    const newOrder = {
      id: `ORD-${randomId}`,
      createdAt: new Date().toISOString(),
      status: 'Order Placed',
      customerName: orderPayload.deliveryAddress.fullName || 'Customer',
      customerPhone: orderPayload.deliveryAddress.phone || '+1 (555) 000-0000',
      deliveryAddress: `${orderPayload.deliveryAddress.street}, ${orderPayload.deliveryAddress.city} ${orderPayload.deliveryAddress.zip}`,
      paymentMethod: orderPayload.paymentMethod,
      items: orderPayload.items,
      subtotal: orderPayload.subtotal,
      discount: orderPayload.discount,
      tax: orderPayload.tax,
      deliveryFee: orderPayload.deliveryFee,
      total: orderPayload.grandTotal,
      estimatedMinutes: 25,
      timeline: [
        { status: 'Order Placed', time: 'Just now', completed: true },
        { status: 'Preparing', time: 'Pending', completed: false },
        { status: 'Out for Delivery', time: 'Pending', completed: false },
        { status: 'Delivered', time: 'Pending', completed: false }
      ]
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrder(newOrder);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((ord) => {
        if (ord.id === orderId) {
          const statuses = ['Order Placed', 'Preparing', 'Out for Delivery', 'Delivered'];
          const newIndex = statuses.indexOf(newStatus);

          const updatedTimeline = ord.timeline.map((step, idx) => {
            if (idx <= newIndex) {
              return {
                ...step,
                completed: true,
                time: idx === newIndex ? 'Just now' : step.time
              };
            }
            return { ...step, completed: false };
          });

          const updated = {
            ...ord,
            status: newStatus,
            timeline: updatedTimeline
          };

          if (activeOrder && activeOrder.id === orderId) {
            setActiveOrder(updated);
          }

          return updated;
        }
        return ord;
      })
    );
  };

  const advanceActiveOrderStatus = () => {
    if (!activeOrder) return;
    const statuses = ['Order Placed', 'Preparing', 'Out for Delivery', 'Delivered'];
    const currentIdx = statuses.indexOf(activeOrder.status);
    if (currentIdx < statuses.length - 1) {
      const nextStatus = statuses[currentIdx + 1];
      updateOrderStatus(activeOrder.id, nextStatus);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        activeOrder,
        placeOrder,
        updateOrderStatus,
        advanceActiveOrderStatus,
        setActiveOrder
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);
