import { useCallback, useEffect, useState } from 'react'
import './App.css'
import { Flex, SimpleGrid, Box, Text, useToast } from '@chakra-ui/react'

import Keyboard, { TypedLetter } from './components/Keyboard'

import { words as fiveLetterWords } from './constants/words'

interface Word {
  [selectedWord: number]: Letter[]
}
interface SetWord {
  [selectedWord: number]: (letters: Letter[]) => void
}

interface Letter {
  content: string
  place: number
}

const LETTERS_AMOUNT = 6

const letterInitialState = {
  content: '',
  place: -1,
}

const wordInitialState = Array(LETTERS_AMOUNT).fill(letterInitialState)

function App() {
  const [currentWord, setCurrentWord] = useState<string>('')
  const [selectedLetter, setSelectedLetter] = useState<number>(0)
  const [selectedWord, setSelectedWord] = useState<number>(0)
  const [typedLetters, setTypedLetters] = useState<TypedLetter>({})
  const [firstWord, setFirstWord] = useState<Letter[]>(wordInitialState)
  const [secondWord, setSecondWord] = useState<Letter[]>(wordInitialState)
  const [thirdWord, setThirdWord] = useState<Letter[]>(wordInitialState)
  const [fourthWord, setFourthWord] = useState<Letter[]>(wordInitialState)
  const [fifthWord, setFifthWord] = useState<Letter[]>(wordInitialState)
  const [sixthWord, setSixthWord] = useState<Letter[]>(wordInitialState)
  const [seventhWord, setSeventhWord] = useState<Letter[]>(wordInitialState)

  const toast = useToast()

  const words: Word = {
    0: firstWord,
    1: secondWord,
    2: thirdWord,
    3: fourthWord,
    4: fifthWord,
    5: sixthWord,
    6: seventhWord,
  }

  const setWords: SetWord = {
    0: setFirstWord,
    1: setSecondWord,
    2: setThirdWord,
    3: setFourthWord,
    4: setFifthWord,
    5: setSixthWord,
    6: setSeventhWord,
  }

  const removeLetter = () => {
    if (selectedLetter > 0) {
      const typedWord = words[selectedWord]

      typedWord[selectedLetter - 1].content = ''
      setWords[selectedWord](typedWord)
      setSelectedLetter(selectedLetter - 1)
    }
  }

  const addLetterToHistory = (letter: string, place: number) => {
    const auxTypedLetters = typedLetters

    if (typedLetters[letter] === undefined || typedLetters[letter] < place) {
      auxTypedLetters[letter] = place
      setTypedLetters(auxTypedLetters)
    }
  }

  const checkLetterPosition = () => {
    const typedWord = words[selectedWord]
      .map((letter) => {
        return letter.content
      })
      .join('')

    const newWord = words[selectedWord].map((letter: Letter, index) => {
      const indexOfLetterInCurrent = currentWord.indexOf(letter.content) // Check if letter exists in current word
      const indexOfLetterInTyped = typedWord.indexOf(letter.content)

      if (indexOfLetterInCurrent === -1) {
        addLetterToHistory(letter.content, -1)
        return {
          ...letter,
          place: indexOfLetterInCurrent,
        }
      }

      const countInCurrentWord = currentWord.split(letter.content).length - 1 // Check how many times the letter shows up in current word
      const countInTypedWord = typedWord.split(letter.content).length - 1 // Check how many times the letter shows up in typed word

      if (countInTypedWord > countInCurrentWord) {
        if (indexOfLetterInTyped === index) {
          if (letter.content === currentWord[index]) {
            addLetterToHistory(letter.content, 1)
            return {
              ...letter,
              place: 1,
            }
          } else {
            addLetterToHistory(letter.content, 0)
            return {
              ...letter,
              place: 0,
            }
          }
        }

        addLetterToHistory(letter.content, -1)
        return {
          ...letter,
          place: -1,
        }
      } else if (countInTypedWord === countInCurrentWord) {
        if (letter.content === currentWord[index]) {
          addLetterToHistory(letter.content, 1)
          return {
            ...letter,
            place: 1,
          }
        }

        addLetterToHistory(letter.content, 0)
        return {
          ...letter,
          place: 0,
        }
      } else if (countInTypedWord < countInCurrentWord) {
        if (letter.content === currentWord[index]) {
          addLetterToHistory(letter.content, 1)
          return {
            ...letter,
            place: 1,
          }
        }
      } else if (indexOfLetterInTyped !== index) {
        addLetterToHistory(letter.content, -1)
        return {
          ...letter,
          place: -1,
        }
      }

      addLetterToHistory(letter.content, 0)
      return {
        ...letter,
        place: 0,
      }
    })

    setWords[selectedWord](newWord)
  }

  const enterWord = () => {
    const wordContent = words[selectedWord]
      .map((letter) => {
        return letter.content
      })
      .join('')
    if (wordContent.length < LETTERS_AMOUNT) {
      return toast({
        title: 'Palavra incompleta',
        description: 'A palavra deve possuir cinco letras',
        status: 'warning',
        isClosable: true,
      })
    }

    if (!fiveLetterWords.some((word) => word.toUpperCase() === wordContent)) {
      toast({
        title: 'Palavra não encontrada',
        description:
          'A palavra não foi encontrada na lista de palavras válidas',
        status: 'warning',
        isClosable: true,
      })
    } else {
      if (selectedLetter > LETTERS_AMOUNT - 1) {
        if (wordContent === currentWord) {
          const newWord = words[selectedWord].map((letter) => {
            return {
              ...letter,
              place: 1,
            }
          })
          setWords[selectedWord](newWord)
          document.removeEventListener('keydown', onKeyPress, false)
          toast({
            title: 'Palavra correta!',
            description: 'Atualize a página para jogar com uma palavra nova',
            status: 'success',
            isClosable: true,
          })
        } else if (selectedWord === LETTERS_AMOUNT) {
          const newWord = words[selectedWord].map((letter) => {
            return {
              ...letter,
              place: -2,
            }
          })
          setWords[selectedWord](newWord)
          document.removeEventListener('keydown', onKeyPress, false)
          toast({
            title: 'Você perdeu',
            description: `A palavra correta era ${currentWord}. Atualize a página para jogar com uma palavra nova`,
            status: 'error',
            isClosable: true,
          })
        } else {
          checkLetterPosition()
          setSelectedWord(selectedWord + 1)
          setSelectedLetter(0)
        }
      }
    }
  }

  const setLetter = useCallback(
    (key: string) => {
      if (key === 'BKSPC' || key === 'BACKSPACE') return removeLetter()
      if (key === 'ENTER') return enterWord()
      if (selectedLetter > LETTERS_AMOUNT - 1) return

      const typedWord = words[selectedWord]
      const newWord = typedWord.map((letter, index) => {
        if (index < selectedLetter) return letter
        if (index === selectedLetter)
          return {
            content: key,
            place: -1,
          }
        return {
          content: '',
          place: -1,
        }
      })

      setWords[selectedWord](newWord)
      if (selectedLetter <= LETTERS_AMOUNT - 1)
        setSelectedLetter(selectedLetter + 1)
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

  const letterBox = (letter: Letter, index: number, word: number) => {
    return (
      <Box
        border="solid rgba(0, 0, 0, 0.4) 6px"
        transition="background-color 200ms linear"
        bgColor={
          letter.place === 0
            ? 'rgba(255, 255, 0, 0.3)'
            : letter.place === 1
            ? 'rgba(0, 255, 0, 0.3)'
            : letter.place === -2
            ? 'rgba(255, 0, 0, 0.6)'
            : 'transparent'
        }
        borderRadius="8px"
        borderStyle={
          selectedLetter === index && word === selectedWord ? 'groove' : 'solid'
        }
        key={index}
        m="4px"
        height="58px"
        width="58px"
      >
        <Text
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontWeight="bold"
          height="100%"
          color="white"
          fontSize="3xl"
          textAlign="center"
        >
          {letter.content}
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
      const normalizedWord = randomWord
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
      setCurrentWord(normalizedWord.toUpperCase())
    }
  }, [currentWord])

  return (
    <Flex
      bgColor="#282c34"
      justifyContent="center"
      width="100vw"
      height="100vh"
    >
      <Flex flexDirection="column" height="100vh" maxWidth="720px">
        <Flex
          justifyContent="center"
          alignItems="center"
          height="calc(100vh - 160px)"
        >
          <SimpleGrid width="max(320px, 90%)" columns={6}>
            {firstWord.map((letter, index) => letterBox(letter, index, 0))}
            {secondWord.map((letter, index) => letterBox(letter, index, 1))}
            {thirdWord.map((letter, index) => letterBox(letter, index, 2))}
            {fourthWord.map((letter, index) => letterBox(letter, index, 3))}
            {fifthWord.map((letter, index) => letterBox(letter, index, 4))}
            {sixthWord.map((letter, index) => letterBox(letter, index, 5))}
            {seventhWord.map((letter, index) => letterBox(letter, index, 6))}
          </SimpleGrid>
        </Flex>
        <Flex height="150px" maxWidth="500px">
          <Keyboard typedLetters={typedLetters} setLetter={setLetter} />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default App
