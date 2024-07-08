'use client';

import { ThemeProvider } from 'next-themes';
import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient()
export function Providers({ children }: PropsWithChildren) {
    return (
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
			<QueryClientProvider client={queryClient}> {children}</QueryClientProvider>
           
        </ThemeProvider>
    );
}
