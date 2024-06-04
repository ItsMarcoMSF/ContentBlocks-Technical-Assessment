// app/providers.tsx
'use client'

import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'jotai'
import theme from './theme';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <Provider>
        {children}
      </Provider>
    </ChakraProvider>
  );
}