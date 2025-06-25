import { Outlet } from 'react-router-dom';
import { ChakraUIProviders } from '@/components/Provider/ChakraUIProvider';
import QueryClientProviderWrapper from '@/components/Provider/QueryClientProvider';
import ClientProvider from '@/components/Provider/ClientProviders';

function Layout(): React.ReactNode {
  return (
    <ChakraUIProviders>
      <QueryClientProviderWrapper>
        <ClientProvider>
          {/* <ThemeProviderWrapper> */}
          <Outlet />
          {/* </ThemeProviderWrapper> */}
        </ClientProvider>
      </QueryClientProviderWrapper>
    </ChakraUIProviders>
  );
}

export default Layout;
