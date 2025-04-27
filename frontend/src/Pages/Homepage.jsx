import { Container } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Box, Text, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from '../components/Authentication/Login'
import Signup from '../components/Authentication/SignUp'
import { useHistory } from 'react-router-dom'

const Homepage = () => {
  const history = useHistory()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'))
    if (user) {
      history.push('/chats')
    }
  }, [history]);

  return (
    <Container maxW="xl" centerContent>
      <Box
      d="flex"
      justifyContent="center"
      alignItems="center"
      bg="white"
      p={3}
      w="100%"
      m="40px 0 15px 0"
      borderRadius="lg"
      borderWidth="1px"
      >
        <Text
        textColor={"blackAlpha.800"}
        textAlign={"center"}
        fontSize="2xl"
        >Tik-Talk</Text>
      </Box>
      <Box
      d="flex"
      justifyContent="center"
      alignItems="center"
      bg="white"
      w="100%"
      p={3}
      m="8px 0 10px 0"
      borderRadius="lg"
      borderWidth="1px"
      boxShadow="lg-md"
      borderColor="blackAlpha.800"
      >
        <Tabs variant="soft-rounded" isFitted w="100%" textColor={"blackAlpha.800"}>
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default Homepage