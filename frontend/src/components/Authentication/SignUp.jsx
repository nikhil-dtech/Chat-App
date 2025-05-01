import { ChatState } from '../../Context/ChatProvider';
import { VStack } from '@chakra-ui/react';
import { FormControl, FormLabel } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { InputGroup, InputRightElement } from '@chakra-ui/react';
import React from 'react';
import { Button } from '@chakra-ui/react';
import { useState} from 'react';
import { set } from 'mongoose';
import { useToast} from '@chakra-ui/react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

 
const Signup = () => {
    
    const [show, setShow] = React.useState(false);
    const [name, setName] = React.useState();
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();
    const [confirmPassword, setConfirmPassword] = React.useState();
    const [pic, setPic] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const history = useHistory();
    const { setUser } = ChatState();

    const handleClick = () => {
    setShow(!show);
  }

    const PostDetails = (pics) => {
        setLoading(true);
        if (pics === undefined) {
            toast({
                title: "Please select an image",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }
        if(pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "chat-app");
            data.append("cloud_name", "dhishhhvx");
            fetch("https://api.cloudinary.com/v1_1/dhishhhvx/image/upload", {
                method: "post",
                body: data,
            }).then((res) => res.json())
            .then((data) => {
                setPic(data.url.toString());
                setLoading(false);
            }).catch((err) => {
                console.log(err);
                setLoading(false);
            });
        } else {
            toast({
                title: "Please select an image",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }
    }

    const submitHandler = async () => {
        setLoading(true);   
        if (!name || !email || !password || !confirmPassword) {
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
        if (password !== confirmPassword) {
            toast({
                title: "Passwords do not match",
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
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post("/api/user", { name, email, password, pic }, config);
            toast({
                title: "Registration Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            setUser(data);
            setLoading(false);
            history.push("/chats");
        } catch (error) {
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
    }

return (
    <VStack spacing='5px' w='100%'>
            <FormControl isRequired>
                    <FormLabel>Name</FormLabel> 
                    <Input type="text"
                    bg={"lightgray"}
                    placeholder='Enter your name'
                    onChange={(e) => setName(e.target.value)}
                    />
            </FormControl>
            <FormControl isRequired >
                    <FormLabel>E-mail</FormLabel> 
                    <Input type="text"
                    bg={"lightgray"}
                    placeholder='Enter your email'
                    onChange={(e) => setEmail(e.target.value)}
                    />
            </FormControl>
            <FormControl id='password' isRequired>
                    <FormLabel>Password</FormLabel> 
                    <InputGroup>
                            <Input
                            bg={"lightgray"}
                            pr='4.5rem'
                            type={show ? 'text' : 'password'}   
                            placeholder='Enter your password'
                            onChange={(e) => setPassword(e.target.value)}
                            />
                            <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm' onClick={() => setShow(!show)} color={"blackAlpha.800"} bg="white" _hover={{bg: "blackAlpha.800", color: "white"}}>
                                    {show ? "Hide" : "Show"}
                                    </Button>
                            </InputRightElement>
                    </InputGroup>
            </FormControl>
            <FormControl id='confirmpassword' isRequired>
                    <FormLabel>Confirm Password</FormLabel> 
                    <InputGroup>
                            <Input
                            bg={"lightgray"}
                            pr='4.5rem'
                            type={show ? 'text' : 'password'}   
                            placeholder='Confirm password'
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm' onClick={() => setShow(!show)} color={"blackAlpha.800"} bg="white" _hover={{bg: "blackAlpha.800", color: "white"}}>
                                    {show ? "Hide" : "Show"}
                                    </Button>
                            </InputRightElement>
                    </InputGroup>
            </FormControl>

            <FormControl id='pic'>
                    <FormLabel>Upload your profile picture</FormLabel> 
                    <Input type="file"
                    accept='image/*'
                    bg={"lightgray"}
                    p={1.5}
                    onChange={(e) => PostDetails(e.target.files[0])}
                    />
                    <Button
                    colorScheme='blue'
                    variant='solid'
                    mt={4}
                    width='100%'
                    onClick={submitHandler}
                    isLoading={loading}
                    spinner={<span style={{ color: "black" }}>Loading...</span>}
                    isDisabled={loading}
                    >Sign Up</Button>
            </FormControl>
    </VStack>
);
}

export default Signup;