import { Button, Grid, GridItem } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'

export interface TypedLetter {
  [letter: string]: number
}
interface KeyboardProps {
  typedLetters: TypedLetter
  setLetter: (key: string) => void
}

export default function Keyboard({ setLetter, typedLetters }: KeyboardProps) {
  const keyBoardLetter = (letter: string, colSpan?: number) => {
    return (
      <GridItem colSpan={colSpan || 1}>
        <Button
          variant="outline"
          colorScheme="gray"
          color={
            typedLetters[letter] === -1
              ? 'gray'
              : letter === 'BKSPC'
              ? 'rgba(255, 0, 0, 0.5)'
              : 'white'
          }
          backgroundColor={
            typedLetters[letter] === 0
              ? 'rgba(255, 255, 0, 0.3)'
              : typedLetters[letter] === 1
              ? 'rgba(0, 255, 0, 0.3)'
              : 'transparent'
          }
          borderColor={
            letter === 'ENTER'
              ? 'rgba(0, 255, 0, 0.3)'
              : letter === 'BKSPC'
              ? 'rgba(255, 0, 0, 0.5)'
              : 'white'
          }
          fontWeight="bold"
          marginBottom="4px"
          onClick={() => setLetter(letter)}
        >
          {letter === 'ENTER' ? (
            <CheckIcon color="rgba(0, 255, 0, 0.3)" />
          ) : (
            letter
          )}
        </Button>
      </GridItem>
    )
  }

  return (
    <Grid templateColumns="repeat(12, 1fr)" templateRows="repeat(3, 1fr)">
      <GridItem />
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
      <GridItem />
      <GridItem />
      <GridItem />
      {keyBoardLetter('A')}
      {keyBoardLetter('S')}
      {keyBoardLetter('D')}
      {keyBoardLetter('F')}
      {keyBoardLetter('G')}
      {keyBoardLetter('H')}
      {keyBoardLetter('J')}
      {keyBoardLetter('K')}
      {keyBoardLetter('L')}
      <GridItem />
      <GridItem />
      {keyBoardLetter('BKSPC', 2)}
      {keyBoardLetter('Z')}
      {keyBoardLetter('X')}
      {keyBoardLetter('C')}
      {keyBoardLetter('V')}
      {keyBoardLetter('B')}
      {keyBoardLetter('N')}
      {keyBoardLetter('M')}
      {keyBoardLetter('ENTER', 2)}
    </Grid>
  )
}
