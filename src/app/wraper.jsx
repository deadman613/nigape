// app/ClientWrapper.jsx
'use client';

import { useState, useEffect } from 'react';
import Loader from './Loader.jsx';

export default function ClientWrapper({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Adjust based on your loader duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {children}
      {loading && <Loader />}
    </>
  );
}
