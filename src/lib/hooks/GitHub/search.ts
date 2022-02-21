import { useContext } from 'react';
import useSWR from 'swr'
import { API_ENDPOINTS } from '../../../config'
import { GlobalShellContext } from '../../../layouts/default/providers';

interface SWRReturn { 
  data: any,
  isLoading: boolean,
  isError: boolean,
}

const { github: { search } } = API_ENDPOINTS

export function useSearch ({page = 1, perPage = 30}): SWRReturn {
  const { shouldFetch, searchQuery } = useContext(GlobalShellContext)
  const requestOptions = [
    `page=${page}`,
    `per_page=${perPage}`,
    `q=${encodeURIComponent(searchQuery)}`,
  ];
  const URI = `${search}/users?${requestOptions.join('&')}`;
  const { data, error } = useSWR(shouldFetch ?  URI : null);
  console.log({data, error, shouldFetch, searchQuery, URI})

  return {
    data: {
      ...data,
      page,
      totalPages: Math.ceil(data?.total_count / perPage),
    },
    isLoading: !error && !data,
    isError: error
  }
}
