'use client';
import React from 'react';
import useServiceWorker from '@/hooks/useServiceWorker';

export default function ServiceWorkerProvider({ children }: { children: React.ReactNode }) {
  useServiceWorker();
  return <>{children}</>;
}
