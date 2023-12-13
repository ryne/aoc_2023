import { loadPuzzleInput } from '../helpers';
const inputArray = await loadPuzzleInput('input.txt');

// Part 1

type ScratchCard = {
  cardNumbers: number[];
  winningNumbers: number[];
  points: number | null;
};

const checkScratchCards: ScratchCard[] = inputArray.map((card: string) => {
  const scratchCard: ScratchCard = {
    cardNumbers: [],
    winningNumbers: [],
    points: null,
  };

  const formatCards = card
    .split(':')[1]
    .trim()
    .replace(/  +/g, ' ')
    .split(' | ');

  scratchCard.cardNumbers = formatCards[0].split(' ').map(Number);
  scratchCard.winningNumbers = formatCards[1].split(' ').map(Number);

  let matches = 0;
  let points = 0;

  scratchCard.cardNumbers.forEach((number) => {
    if (scratchCard.winningNumbers.includes(number)) {
      matches++;
      matches === 0 || matches === 1 ? points++ : (points = points * 2);
    }
  });

  scratchCard.points = points;

  return scratchCard;
});

const totalPoints = checkScratchCards.reduce((a, c) => a + (c.points ?? 0), 0);

console.log(`Total points of all winning numbers: ${totalPoints}`);
