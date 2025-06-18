'use client';

import { useEffect } from 'react';

const useServiceWorker = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {    
        navigator.serviceWorker
          .register('/service-worker.js')
          .then(
            (registration) => {
              console.log('ServiceWorker registration successful');
            },
            (err) => {
              console.log('ServiceWorker registration failed: ', err);
            }
          );
    
    }
  }, []);
};

export default useServiceWorker;
