import { Flex, Box, Avatar, Text } from "@chakra-ui/react";

interface ProfileProps{
  showProfileData?: boolean; 
}

export function Profile({ showProfileData = true }: ProfileProps){
  return(
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Rennan Maxwell</Text>
            <Text color="gray.300" fontSize="small">
             rennanmax80@gmail.com
            </Text>
        </Box>
      )}
        
          <Avatar size="md" name="Rennan Maxwell" src="https://github.com/rennanmax80.png" />
        </Flex>
  )
}