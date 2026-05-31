"use client";

import React from 'react';

export default function ProductCard({ product, onClick }) {

  return (
    <div
      className="cursor-pointer"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}