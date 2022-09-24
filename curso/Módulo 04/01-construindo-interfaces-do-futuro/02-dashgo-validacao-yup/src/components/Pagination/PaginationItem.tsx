import { Button } from "@chakra-ui/react";

interface PaginationItemProps {
 isCurrent?: boolean;
 number: number;
}

export function PaginationItem({number, isCurrent = false }: PaginationItemProps) {
  if(isCurrent){
    return (
      <Button
        fontSize="xs"
        size="sm"
        colorScheme="pink"
        w="4"
        _disabled={{
          bgColor:
          'pink.500',
          cursor:
          'pointer'
        }}
        disabled
      >
        {number}
      </Button>
    )
  }
  
  return (
    <Button
      size="sm"
      fontSize="xs"
      w="4"
      bg="gray.700"
      _hover={{
        bg: 'gray.500'
      }}
    >
      {number}
    </Button>
  )
}