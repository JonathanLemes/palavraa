import { Button, Grid, GridItem } from '@chakra-ui/react'

interface KeyboardProps {
  setLetter: (key: string) => void
}

export default function Keyboard({ setLetter }: KeyboardProps) {
  const keyBoardLetter = (letter: string, colSpan?: number) => {
    return (
      <GridItem colSpan={colSpan || 1}>
        <Button
          variant="outline"
          colorScheme="gray"
          color="white"
          fontWeight="bold"
          marginBottom="4px"
          width="100%"
          onClick={() => setLetter(letter)}
        >
          {letter}
        </Button>
      </GridItem>
    )
  }

  return (
    <Grid
      gap={2}
      templateColumns="repeat(12, 1fr)"
      templateRows="repeat(3, 1fr)"
    >
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
