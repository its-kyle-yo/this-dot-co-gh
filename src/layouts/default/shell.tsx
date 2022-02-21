import { AppShell, Header } from '@mantine/core';
import SearchBar from '../../components/SearchBar';

const DefaultHeader = () => {
  return (
      <Header height={60} padding="xs">
        <SearchBar />
      </Header>
    )
}

const DefaultShell = ({children}: any) => (
    <AppShell
      padding="md"
      header={<DefaultHeader/>}
    >
      {children}
    </AppShell>
  )

export default DefaultShell;