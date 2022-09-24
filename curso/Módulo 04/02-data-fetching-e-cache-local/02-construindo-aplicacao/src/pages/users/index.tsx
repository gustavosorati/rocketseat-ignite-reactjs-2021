import { Box, Button, Checkbox, Flex, Heading, Icon, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import Link from "next/link";
import { Link as ChakraLink } from '@chakra-ui/react'
import { useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { useQuery } from "react-query";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { getUsers, useUsers } from "../../services/hooks/useUsers";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";
import { GetServerSideProps } from "next";

type User = {
  name: string;
  email: string;
  created_at: string;
}

export default function UserList({ users }) {
  const [page, setPage] = useState(1);
  
  // key, método que irá retornar os dados,
  const { data, error, isFetching, isLoading } = useUsers(page, {
    initialData: users
  });

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  async function handlePrefetchUser(userId: string){
    await queryClient.prefetchQuery(['user', userId], async () => {
      const response = await api.get(`users/${userId}`)

      return response.data;
    }, {
      staleTime: 1000 * 60 * 10 // 10min
    });
  }

  return (
    <Box>
      <Header />

     <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">Usuários</Heading>
            
            {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4"/>}
            <Link href="/users/create" passHref>
              <Button as="a" size="sm" fontSize="sm" colorScheme="pink" cursor="pointer" leftIcon={<Icon as={RiAddLine} />}>
                Criar novo
              </Button>
            </Link>
          </Flex>

          { isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex>
              <Text>Falha ao obter dados dos usuários.</Text>
            </Flex>
          ) : (
            <>
            <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th px={["4", "4", "6"]} color="gray.300" width="8">
                  <Checkbox colorScheme="pink" />
                </Th>

                <Th>Usuário</Th>
                
                { isWideVersion && (
                  <>
                    <Th>Data de Cadastro</Th>
                    <Th w="8"></Th>
                  </>
                )}
              </Tr>
            </Thead>

            <Tbody>
              {data.users.map(user => (
                <Tr key={user.id}>
                <Td px={["4", "4", "6"]}>
                  <Checkbox colorScheme="pink" />
                </Td>

                <Td>
                  <Box>
                    <ChakraLink color="purple.400" onMouseEnter={() => handlePrefetchUser(user.id)}>
                     <Text fontWeight="bold">{user.name}</Text>
                    </ChakraLink>
                    <Text fontSize="sm" color="gray.300">{user.email}</Text>
                  </Box>
                </Td>
                
                {isWideVersion && (
                  <>
                    <Td>{user.createdAt}</Td>
                    
                    <Td>
                      <Button as="a" size="sm" fontSize="16" colorScheme="purple" cursor="pointer" leftIcon={<Icon as={RiPencilLine} />}>
                        Editar
                      </Button>
                    </Td>
                  </>
                )}
                
                </Tr>
                )
              )}
            </Tbody>
          </Table>

          <Pagination 
            totalCountOfRegisters={data.totalCount}
            currentPage={page}
            onPageChange={setPage}
          />
          </>
          )}

        </Box>
      </Flex>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const {users, totalCount} = await getUsers(1);



  return {
    props: {
      users
    }
  }
}