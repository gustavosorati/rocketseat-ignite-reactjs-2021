import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";


interface PaginationProps {
  totalCountOfRegisters: number;
  registerPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const siblingsCount = 1;

function generatePagesArray(from: number, to: number){
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1
    })
    .filter((page) => page > 0)
}

// generatePagesArray(2, 5)
// [0, 0, 0]
// [2 + 0 + 1, 2 + 1 + 1, 2 + 2 + 1]
// [3, 4, 5]


export function Pagination({ totalCountOfRegisters, currentPage = 1, onPageChange, registerPerPage = 10} : PaginationProps) {
  // Lógica paginação
  const lastPage = Math.ceil(totalCountOfRegisters / registerPerPage);
  
  const previousPages = currentPage > 1
    ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
    : []

  const nextPages = currentPage < lastPage
    ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
    : []

  return(
    <Stack spacing="6" direction={["column", "row"]} mt="8" justify="space-between" align="center">
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>
      <Stack spacing="2" direction="row">

        {currentPage > (1 + siblingsCount) && (
          <>
            <PaginationItem onPageChange={onPageChange} number={1}/>
            {currentPage >(2 + siblingsCount) && <Text>...</Text> }
          </>
        )}

        {previousPages.length > 0 && previousPages.map(page => {
          return <PaginationItem onPageChange={onPageChange} key={page} number={page}/>
        })}

        <PaginationItem onPageChange={onPageChange} number={currentPage} isCurrent />

        {nextPages.length > 0 && nextPages.map(page => {
          return <PaginationItem onPageChange={onPageChange} key={page} number={page}/>
        })}

        {(currentPage + siblingsCount) < lastPage && (
          <>
            {/* {currentPage < (lastPage - 2) && <Text>...</Text> }  minha versão */}
            {(currentPage + 1 + siblingsCount) < lastPage && <Text color="gray.300" textAling="center" width={6}>...</Text> }
            <PaginationItem onPageChange={onPageChange} number={lastPage}/>
          </>
        )}

        
      </Stack>
    </Stack>
  )
}