import { createContext, useState } from 'react';
import { MantineProvider } from '@mantine/core';
import { SWRConfig } from 'swr';
import { DEFAULT_SWR_CONFIG } from '../../config'

const defaultShellContext = {shouldFetch: false, searchQuery: ""};

export const GlobalShellContext = createContext({});
export const DefaultProviders = ({ children }: any) => {
  const [shouldFetch, setShouldFetch] = useState(defaultShellContext.shouldFetch);
  const [searchQuery, setSearchQuery] = useState(defaultShellContext.searchQuery);

  const handleSubmit = (query: string): void => {
    console.log('handleSubmit', { query});
    setSearchQuery(query);
    setShouldFetch(true);
  }

  const shellContext = {
    shouldFetch, 
    setShouldFetch, 
    searchQuery,
    setSearchQuery,
    handleSubmit
  };
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
    >
      <SWRConfig value={{ ...DEFAULT_SWR_CONFIG }}>
        <GlobalShellContext.Provider value={{...shellContext}}>
          {children}
        </GlobalShellContext.Provider>
      </SWRConfig>
    </MantineProvider>
  )
}

export default DefaultProviders