import React from 'react';
import { VStack } from '@chakra-ui/react';
import { FormControl, FormLabel } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { InputGroup, InputRightElement } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { useState} from 'react';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/react';
import { 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalCloseButton, 
  ModalBody, 
  ModalFooter,
  Text, 
  Image 
} from '@chakra-ui/react';
import  MyPic1 from "./MyPic1.jpeg";

const Login = () => {
    const [show, setShow] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const toast = useToast();
    const history = useHistory();


    const handleClick = () => {
        setShow(!show);
    };

    const submitHandler = async () => {
        setLoading(true);
        if (!email || !password) {
            toast({
                title: "Please fill all the fields",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }   

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.post(
                "/api/user/login",
                { email, password },
                config
            );
            toast({
                title: "Login Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            history.push("/chats");
        }
        catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
    };



  return (
   <VStack>
        <FormControl isRequired>
            <FormLabel>E-mail</FormLabel> 
            <Input type="email"
            bg={"lightgray"}
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        </FormControl>
        <FormControl isRequired>
            <FormLabel>Password</FormLabel> 
            <InputGroup size='md'>
            <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Enter password'
                bg={"lightgray"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
                </Button>
            </InputRightElement>
            </InputGroup>
        </FormControl>
        <Button  
        colorScheme='blue' 
        width='100%' 
        style={{ marginTop: 15 }} 
        onClick={submitHandler}
        isLoading={loading}
        >
            Login
        </Button>
        <Button variant='solid' w={"100%"} colorScheme='red' onClick={() => {
            setEmail("guest@example.com");
            setPassword("123456");
        }} >Get Guest User</Button>
        <>
         <Button variant='solid' w={"50%"} colorScheme='orange' onClick={onOpen}>About Us</Button>
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg" motionPreset='slideInBottom'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontFamily="Work sans"
            fontSize="30px"
            display="flex"
            justifyContent="center"
          >
            {/* {user.name} */}
            Nikhil Dhakad
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image 
               src={MyPic1}
               alt="My Pic"
              borderRadius="full" 
              boxSize="150px" 
              objectFit="cover"
            />
            
            <div
            style={{
                display:"flex",
                width:"100%",
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"space-between",
                padding:"8px 20px"
            }}
            >
            <Text fontSize={{ base: "15px", md: "20px" }} fontFamily="Work sans" color={"blue"}
            >
              <a href="https://www.linkedin.com/in/nikhil-dhakad-46304b285?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/2048px-LinkedIn_icon.svg.png" 
                    alt="LinkedIn Link" 
                    width="30" 
                    height="30"
                    style={{margin:"auto"}}
                />
              <span>Linked-In</span>
              </a>
            </Text>
            <Text fontSize={{ base: "15px", md: "20px" }} fontFamily="Work sans" color={"blue"}
            >
              <a href="https://github.com/nikhil-dtech">
                <img 
                    src="https://cdn-icons-png.flaticon.com/512/25/25231.png" 
                    alt="git-link" 
                    width="30" 
                    height="30"
                    style={{margin:"auto"}}
                />
              <span>Git-Hub</span>
              </a>
            </Text>
            <Text fontSize={{ base: "15px", md: "20px" }} fontFamily="Work sans" color={"blue"}
            >
              <a href="https://www.instagram.com/its__nikhiiil?igsh=cXp5bml6dXJubjcz">
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" 
                    alt="insta-link" 
                    width="32" 
                    height="32"
                    style={{margin:"auto"}}
                />
              <span>Instagram</span>
              </a>
            </Text>
            </div>
            <Text fontSize={{ base: "15px", md: "20px" }} fontFamily="Work sans"
            >
              Contact - <span
              style={{
                color:"blue"
              }}
              >+91 6260825866</span>
            </Text>
            <Text fontSize={{ base: "15px", md: "20px" }} fontFamily="Work sans"
            >
              E-Mail - <span
              style={{
                color:"blue"
              }}
              >www.nikhiltech@gmail.com</span>
            </Text>
            <Text fontSize={{ base: "15px", md: "20px" }} fontFamily="Work sans"
            bg={"lightgray"} borderRadius={"4px"} textAlign={"center"}
            p={"7px 5px"}
            m={"5px 0"} color={"black"}
            >
              Hi there! 👋 Thanks for visiting my real-time chat 
              application(Tik-Talk). I'm Nikhil Dhakad, and I built this app using 
               the MERN stack (MongoDB, Express.js, React, and Node.js) along 
               with Socket.IO for smooth, instant messaging. This project reflects 
               my passion for creating fast and interactive web apps. Whether you're 
               here to chat with friends or explore how it works, I hope you enjoy 
              your experience! Feel free to reach out if you’d like to know more 
              about me or this project.
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
        </>
   </VStack>
  );
}

export default Login;