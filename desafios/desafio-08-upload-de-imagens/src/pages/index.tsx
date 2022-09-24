import { Button, Box, SimpleGrid } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { string } from 'yup';
import { AxiosResponse } from 'axios';
import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface Image {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface GetImageResponse {
  after: string;
  data: Image[];
}

export default function Home(): JSX.Element {
  async function fetchProject({ pageParam = 0 }): Promise<GetImageResponse> {
    const { data } = await api.get(`/api/images`, {
      params: {
        after: pageParam,
      },
    });

    return data;
  }

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchProject, {
    getNextPageParam: lastPage => {
      return lastPage.after || null;
    },
  });

  const formattedData = useMemo(() => {
    if (data) {
      const pictures = data.pages
        .map(page => {
          const { data: picture } = page;
          return picture;
        })
        .flat();

      return pictures;
    }

    return null;
  }, [data]);

  if (isLoading) return <Loading />;

  if (isError) return <Error />;

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        {data && <CardList cards={formattedData} />}

        {hasNextPage && (
          <Button colorScheme="orange" onClick={() => fetchNextPage()} mt={8}>
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
