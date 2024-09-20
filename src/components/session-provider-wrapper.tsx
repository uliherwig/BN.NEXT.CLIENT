// components/SessionProviderWrapper.tsx

'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode, useEffect, useState } from 'react';

interface Props {
  children: ReactNode;
}

const SessionProviderWrapper = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>
};

export default SessionProviderWrapper;