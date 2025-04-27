import React from 'react';
import { useDisclosure } from '@chakra-ui/hooks';
import { 
  IconButton,
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalCloseButton, 
  ModalBody, 
  ModalFooter,
  Text, 
  Image, 
  Button 
} from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={{ base: "flex" }}
          icon={<ViewIcon />}
          onClick={onOpen}
        />
      )}
      
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg" motionPreset='slideInBottom'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontFamily="Work sans"
            fontSize="30px"
            display="flex"
            justifyContent="center"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image 
              src={user.pic}
              alt={user.name} 
              borderRadius="full" 
              boxSize="150px" 
              objectFit="cover"
            />
            <Text fontSize={{ base: "28px", md: "30px" }} fontFamily="Work sans">
              {user.name}
            </Text>
            <Text fontSize={{ base: "20px", md: "24px" }} fontFamily="Work sans">
              {user.email}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' variant='solid' onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;