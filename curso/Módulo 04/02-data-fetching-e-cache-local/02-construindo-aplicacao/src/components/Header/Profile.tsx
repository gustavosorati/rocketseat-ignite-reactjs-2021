import { Box, Flex, Text, Avatar } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData: boolean;
}

export function Profile({showProfileData = true}: ProfileProps) {
  return (
    <Flex align="center">

      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Gustavo Sorati</Text>
          <Text color="gray.300" fontSize="small">gustavo.sorati@outlook.com</Text>
        </Box>
      )}

      <Avatar size="md" name="Gustavo Sorati" src="https://avatars.githubusercontent.com/u/22673655?v=4" />
  </Flex>
  )
}