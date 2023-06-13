import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save user data to localStorage
    const userData = { username, email, password };
    localStorage.setItem('userData', JSON.stringify(userData));

    // Clear form fields
    setUsername('');
    setEmail('');
    setPassword('');

    // Redirect to "/home" page
    navigate('/start');
  };

  return (
    <Box
      w="500px"
      mx="auto"
      mt='15%'
      p={6}
      borderWidth={1}
      borderRadius="md"
      boxShadow="md"
      textAlign="center"
      bg={'gray.700'}
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
             
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormControl>
          <Button colorScheme="blue" type="submit" mt={4}>
            Register
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
