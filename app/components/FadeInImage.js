"use client";

import { useEffect, useRef, useState } from 'react';

// Fades an image in once it has actually finished loading (or is already
// cached), instead of fading in right after mount - which on a cold load
// just makes the image pop in unfaded once the bytes finally arrive.
export default function FadeInImage({ className = '', ...imgProps }) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setLoaded(true);
    }
  }, [imgProps.src]);

  return (
    <img
      ref={imgRef}
      onLoad={() => setLoaded(true)}
      className={`transition-opacity duration-700 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      {...imgProps}
    />
  );
}
