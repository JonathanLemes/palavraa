import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import {
  Flex,
  SimpleGrid,
  Box,
  Text,
  Button,
  Grid,
  GridItem,
} from '@chakra-ui/react'

function App() {
  const [selectedLetter, setSelectedLetter] = useState<number>(0)
  const [selectedWord, setSelectedWord] = useState<number>(0)
  const [firstWord, setFirstWord] = useState<string[]>(['', '', '', '', ''])
  const [secondWord, setSecondWord] = useState<string[]>(['', '', '', '', ''])
  const [thirdWord, setThirdWord] = useState<string[]>(['', '', '', '', ''])
  const [fourthWord, setFourthWord] = useState<string[]>(['', '', '', '', ''])
  const [fifthWord, setFifthWord] = useState<string[]>(['', '', '', '', ''])

  const letterBox = (letter: string, index: number, word: number) => {
    return (
      <Box
        border="solid rgba(0, 0, 0, 0.4) 6px"
        borderRadius="8px"
        borderStyle={
          selectedLetter === index && word === selectedWord ? 'groove' : 'solid'
        }
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

  const keyBoardLetter = (letter: string, colSpan?: number) => {
    return (
      <GridItem colSpan={colSpan || 1}>
        <Button
          variant="outline"
          colorScheme="gray"
          color="white"
          fontWeight="bold"
          fontSize="3xl"
          height="64px"
          minWidth="64px"
        >
          {letter}
        </Button>
      </GridItem>
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
          {firstWord.map((letter, index) => letterBox(letter, index, 0))}
          {secondWord.map((letter, index) => letterBox(letter, index, 1))}
          {thirdWord.map((letter, index) => letterBox(letter, index, 2))}
          {fourthWord.map((letter, index) => letterBox(letter, index, 3))}
          {fifthWord.map((letter, index) => letterBox(letter, index, 4))}
        </SimpleGrid>
        <Grid
          gap={2}
          templateColumns="repeat(10, 1fr)"
          templateRows="repeat(3, 1fr)"
          height="250px"
          width="100%"
        >
          {keyBoardLetter('Q')}
          {keyBoardLetter('W')}
          {keyBoardLetter('E')}
          {keyBoardLetter('R')}
          {keyBoardLetter('T')}
          {keyBoardLetter('Y')}
          {keyBoardLetter('U')}
          {keyBoardLetter('I')}
          {keyBoardLetter('O')}
          {keyBoardLetter('P')}
          {keyBoardLetter('A')}
          {keyBoardLetter('S')}
          {keyBoardLetter('D')}
          {keyBoardLetter('F')}
          {keyBoardLetter('G')}
          {keyBoardLetter('H')}
          {keyBoardLetter('J')}
          {keyBoardLetter('K')}
          {keyBoardLetter('L')}
          {keyBoardLetter('BKSPC')}
          {keyBoardLetter('Z')}
          {keyBoardLetter('X')}
          {keyBoardLetter('C')}
          {keyBoardLetter('V')}
          {keyBoardLetter('B')}
          {keyBoardLetter('N')}
          {keyBoardLetter('M')}
          {keyBoardLetter('ENTER', 2)}
        </Grid>
      </Flex>
    </Flex>
  )
}

export default App
