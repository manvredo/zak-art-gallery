'use client';

import { useState } from 'react';
import CartPage from '@/app/components/CartPage';
import { useCart } from '@/app/context/CartContext';

export default function Cart() {
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);
  const { cart } = useCart();

  const handleCheckout = async () => {
    try {
      setCheckoutLoading(true);
      setCheckoutError(null);

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Checkout error');
      }

      const { url } = await response.json();
      if (!url) throw new Error('No checkout URL received');
      window.location.href = url;

    } catch (error) {
      console.error('Checkout error:', error);
      setCheckoutError(error.message);
      setCheckoutLoading(false);
    }
  };

  return (
    <CartPage 
      onCheckout={handleCheckout}
      checkoutLoading={checkoutLoading}
      checkoutError={checkoutError}
    />
  );
}