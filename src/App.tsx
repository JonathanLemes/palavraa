import { useCallback, useEffect, useState } from 'react'
import './App.css'
import { Flex, SimpleGrid, Box, Text, useToast } from '@chakra-ui/react'

import Keyboard from './components/Keyboard'

import { words as fiveLetterWords } from './constants/words'

interface Word {
  [selectedWord: number]: string[]
}
interface SetWord {
  [selectedWord: number]: (letters: string[]) => void
}

function App() {
  const [currentWord, setCurrentWord] = useState<string>('')
  const [selectedLetter, setSelectedLetter] = useState<number>(0)
  const [selectedWord, setSelectedWord] = useState<number>(0)
  const [firstWord, setFirstWord] = useState<string[]>(['', '', '', '', ''])
  const [secondWord, setSecondWord] = useState<string[]>(['', '', '', '', ''])
  const [thirdWord, setThirdWord] = useState<string[]>(['', '', '', '', ''])
  const [fourthWord, setFourthWord] = useState<string[]>(['', '', '', '', ''])
  const [fifthWord, setFifthWord] = useState<string[]>(['', '', '', '', ''])

  const toast = useToast()

  const words: Word = {
    0: firstWord,
    1: secondWord,
    2: thirdWord,
    3: fourthWord,
    4: fifthWord,
  }

  const setWords: SetWord = {
    0: setFirstWord,
    1: setSecondWord,
    2: setThirdWord,
    3: setFourthWord,
    4: setFifthWord,
  }

  const removeLetter = () => {
    if (selectedLetter > 0) {
      const currentWord = words[selectedWord]
      currentWord[selectedLetter - 1] = ''
      setWords[selectedWord](currentWord)
      setSelectedLetter(selectedLetter - 1)
    }
  }

  const enterWord = () => {
    if (selectedLetter > 4 && selectedWord < 4) {
      const normalizedWord = currentWord
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
      if (words[selectedWord].join('') === normalizedWord) {
        toast({
          title: 'Palavra correta!',
          description: 'Atualize a página para jogar com uma palavra nova',
          status: 'success',
          isClosable: true,
        })
      } else if (
        !fiveLetterWords.some(
          (word) => word.toUpperCase() === words[selectedWord].join('')
        )
      ) {
        toast({
          title: 'Palavra não encontrada',
          description:
            'A palavra não foi encontrada na lista de palavras válidas',
          status: 'warning',
          isClosable: true,
        })
      } else {
        setSelectedWord(selectedWord + 1)
        setSelectedLetter(0)
      }
    } else {
      toast({
        title: 'Você perdeu',
        description: `A palavra correta era ${currentWord}. Atualize a página para jogar com uma palavra nova`,
        status: 'error',
        isClosable: true,
      })
    }
  }

  const setLetter = useCallback(
    (key: string) => {
      if (key === 'BKSPC' || key === 'BACKSPACE') return removeLetter()
      if (key === 'ENTER') return enterWord()
      if (selectedLetter > 4) return
      const currentWord = words[selectedWord]
      currentWord[selectedLetter] = key
      setWords[selectedWord](currentWord)
      if (selectedLetter <= 4) setSelectedLetter(selectedLetter + 1)
    },
    [selectedLetter, selectedWord]
  )

  const onKeyPress = useCallback(
    (event: any) => {
      if (
        (event.keyCode >= 65 && event.keyCode <= 90) ||
        (event.keyCode >= 97 && event.keyCode <= 122) ||
        event.key === 'Enter' ||
        event.key === 'Backspace'
      )
        setLetter(event.key.toUpperCase())
    },
    [selectedLetter, selectedWord]
  )

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

  useEffect(() => {
    document.addEventListener('keydown', onKeyPress, false)

    return () => document.removeEventListener('keydown', onKeyPress, false)
  }, [selectedLetter])

  useEffect(() => {
    if (currentWord === '') {
      const randomWord =
        fiveLetterWords[Math.floor(Math.random() * fiveLetterWords.length)]
      setCurrentWord(randomWord.toUpperCase())
    }
  }, [currentWord])

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
        <Keyboard setLetter={setLetter} />
      </Flex>
    </Flex>
  )
}

export default App
