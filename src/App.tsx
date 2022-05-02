import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { Flex, SimpleGrid, Box, Text } from '@chakra-ui/react'

function App() {
  const [letters, setLetters] = useState(['', '', '', '', ''])

  const letterBox = (letter: string, index: number) => {
    return (
      <Box
        border="solid rgba(0, 0, 0, 0.4) 6px"
        borderRadius="8px"
        key={index}
        m="8px"
        height="80px"
      >
        <Text
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontWeight="bold"
          height="100%"
          color="white"
          fontSize="4xl"
          textAlign="center"
        >
          {letter}
        </Text>
      </Box>
    )
  }

  return (
    <Flex
      bgColor="#282c34"
      justifyContent="center"
      width="100vw"
      height="100vh"
    >
      <Flex flexDirection="column" width="720px">
        <Flex height="120px"></Flex>
        <SimpleGrid columns={5} mx="120px" height="calc(100vh - 370px)">
          {letters.map((letter, index) => letterBox(letter, index))}
          {letters.map((letter, index) => letterBox(letter, index))}
          {letters.map((letter, index) => letterBox(letter, index))}
          {letters.map((letter, index) => letterBox(letter, index))}
          {letters.map((letter, index) => letterBox(letter, index))}
        </SimpleGrid>
        <Flex height="250px"></Flex>
      </Flex>
    </Flex>
  )
}

export default App
