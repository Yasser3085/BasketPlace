import React from 'react';
import {
  Text,
  Box,
  Flex,
  useMediaQuery,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  VStack,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { SiYourtraveldottv } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ onFilterText }) {
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const [searchTerm, setSearchTerm] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [formErrors, setFormErrors] = useState({ name: '', email: '', password: '' });
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already registered
    const storedIsRegistered = localStorage.getItem('isRegistered');
    if (storedIsRegistered === 'true') {
      setIsRegistered(true);
    }

    // Check if user is already logged in
    const storedLoggedIn = localStorage.getItem('loggedIn');
    if (storedLoggedIn === 'true') {
      setLoggedIn(true);
      setUserName(localStorage.getItem('userName'));
      navigate('/reserve'); // Redirect to /reserve page
    }
  }, []);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    onFilterText(value.charAt(0));
  };

  const handleRegistrationInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 4) {
      errors.password = 'Password must be at least 4 characters long';
    }

    return errors;
  };

  const handleRegistration = () => {
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      // Save user data to localStorage
      localStorage.setItem('isRegistered', 'true');
      localStorage.setItem('userData', JSON.stringify(formData));
      localStorage.setItem('userName', formData.name); // Store the user's name

      setIsRegistered(true);
      setSignUpModalOpen(false);
      setLoginModalOpen(true); // Open the login modal after registration
    }
  };

  const handleLogin = () => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      if (formData.email === userData.email && formData.password === userData.password) {
        // Store login status and user name
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('userName', userData.name);

        setLoggedIn(true);
        setUserName(userData.name);
        setFormData({ name: '', email: '', password: '' });
        setLoginModalOpen(false);
        navigate('/reserve'); // Redirect to /reserve page
      } else {
        setFormErrors({ email: 'Invalid credentials', password: 'Invalid credentials' });
      }
    } else {
      setFormErrors({ email: 'Invalid credentials', password: 'Invalid credentials' });
    }
  };

  const handleLogout = () => {
    // Clear stored data on logout
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userName');

    setLoggedIn(false);
    setUserName('');
    navigate('/start'); // Redirect to homepage after logout
  };

  const handleUpdateInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      // Update user data in localStorage
      localStorage.setItem('userData', JSON.stringify(formData));
      localStorage.setItem('userName', formData.name); // Update the user's name

      setUserName(formData.name);
      setFormData({ name: '', email: '', password: '' });
      setUpdateModalOpen(false);
    }
  };

  return (
    <>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1.5rem"
        bg="gray.900"
        color="white"
      >
        <Flex align="center" mr={5}>
          <Box as={SiYourtraveldottv} size="1.5em" />
          <Text ml={2} fontWeight="bold" fontSize="xl">
            BasketPlace
          </Text>
        </Flex>

        {isMobile ? (
          <Box display="flex">
            {loggedIn && (
              <Button
                variant="outline"
                colorScheme="blackalpha"
                size="sm"
                onClick={() => setUpdateModalOpen(true)}
              >
                Welcome, {userName}
              </Button>
            )}
            {!loggedIn && (
              <>
                <Button
                  variant="outline"
                  colorScheme="blackalpha"
                  size="sm"
                  onClick={() => setLoginModalOpen(true)}
                >
                  Login
                </Button>
                <Button
                  variant="outline"
                  colorScheme="blackalpha"
                  size="sm"
                  ml={2}
                  onClick={() => setSignUpModalOpen(true)}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        ) : (
          <Box display="flex" align="center">
            <Input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleInputChange}
              size="sm"
              mr={2}
            />
            {loggedIn && (
              <Text fontSize="sm" mr={2}>
                Welcome, {userName}
              </Text>
            )}
            {loggedIn ? (
              <>
                <Button
                  variant="outline"
                  colorScheme="blackalpha"
                  size="sm"
                  onClick={() => setUpdateModalOpen(true)}
                >
                  Update
                </Button>
                <Button variant="outline" colorScheme="blackalpha" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  colorScheme="blackalpha"
                  size="sm"
                  onClick={() => setLoginModalOpen(true)}
                >
                  Login
                </Button>
                <Button
                  variant="outline"
                  colorScheme="blackalpha"
                  size="sm"
                  ml={2}
                  onClick={() => setSignUpModalOpen(true)}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        )}
      </Flex>

      {/* Registration Modal */}
      <Modal isOpen={signUpModalOpen} onClose={() => setSignUpModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign Up</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleRegistrationInputChange}
                />
                {formErrors.name && (
                  <Text fontSize="sm" color="red.500">
                    {formErrors.name}
                  </Text>
                )}
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleRegistrationInputChange}
                />
                {formErrors.email && (
                  <Text fontSize="sm" color="red.500">
                    {formErrors.email}
                  </Text>
                )}
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleRegistrationInputChange}
                />
                {formErrors.password && (
                  <Text fontSize="sm" color="red.500">
                    {formErrors.password}
                  </Text>
                )}
              </FormControl>
              <Button colorScheme="blackalpha" onClick={handleRegistration}>
                Sign Up
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Login Modal */}
      <Modal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleRegistrationInputChange}
                />
                {formErrors.email && (
                  <Text fontSize="sm" color="red.500">
                    {formErrors.email}
                  </Text>
                )}
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                 
                  onChange={handleRegistrationInputChange}
                />
                {formErrors.password && (
                  <Text fontSize="sm" color="red.500">
                    {formErrors.password}
                  </Text>
                )}
              </FormControl>
              <Button colorScheme="blackalpha" onClick={handleLogin}>
                Login
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Update Modal */}
      <Modal isOpen={updateModalOpen} onClose={() => setUpdateModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleUpdateInputChange}
                />
                {formErrors.name && (
                  <Text fontSize="sm" color="red.500">
                    {formErrors.name}
                  </Text>
                )}
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleUpdateInputChange}
                />
                {formErrors.email && (
                  <Text fontSize="sm" color="red.500">
                    {formErrors.email}
                  </Text>
                )}
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleUpdateInputChange}
                />
                {formErrors.password && (
                  <Text fontSize="sm" color="red.500">
                    {formErrors.password}
                  </Text>
                )}
              </FormControl>
              <Button colorScheme="teal" onClick={handleUpdate}>
                Update
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
