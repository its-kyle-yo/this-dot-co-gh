/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Pagination, Paper, SimpleGrid, Image, Center, Space, Chip, Chips, Anchor } from '@mantine/core';
import type { NextPage } from 'next'
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { GlobalShellContext } from '../layouts/default/providers';

import { useSearch } from '../lib/hooks';

const Home: NextPage = () => {
  const { searchQuery } = useContext(GlobalShellContext)
  const [ activePage, setPage ] = useState(1);
  const { data, isLoading, isError } = useSearch({page: activePage});
  const pageIdentifier = `page-${activePage}`
  const [components, setComponents] = useState({[pageIdentifier]: []});

  useEffect(() => {
    if (data.items?.length) {
      if(!components[pageIdentifier]?.length) {
        const cards = data?.items?.map(({ html_url, login, id, avatar_url, gravatar_id }) => (
          <Paper key={`${login}-${id}`}>
            <Card shadow="xl" padding="md">
              <Anchor href={html_url} target="_blank">
                <Image alt="user avatar" src={gravatar_id || avatar_url} />
              </Anchor>
              <Space h="xl" />
                <Center>
                  <Chip checked={false}>
                    <Anchor href={html_url} target="_blank">
                      {login}
                    </Anchor>
                  </Chip>
                </Center>
            </Card>
          </Paper>
        ));

        setComponents(prev => ({ ...prev, [pageIdentifier]: cards }))
      }
    }
  }, [data])
    
  if(isLoading) return <p>Try searching...</p>;
  if(isError) return <p>Error...</p>;

  return (
    <>
      <Center>
        <span>Found<b> {data.total_count} </b>results for &quot;<em>{searchQuery}</em>&quot;</span>
      </Center>
      <SimpleGrid cols={5}>
        {components[pageIdentifier]?.length && components[pageIdentifier]}
      </SimpleGrid>
      <Space h="xl"/>
      <Center>
        <Pagination total={data.totalPages} page={activePage} onChange={setPage} />
      </Center>
    </>
  )
}

export default Home
