import { loadPuzzleInput } from '../helpers';
const inputArray = await loadPuzzleInput('input.txt');

type NumbersInfo = {
  startCol: number | null;
  endCol: number | null;
  value: string;
  match: boolean;
};

function extractNumbersInfoForArray(inputArray: string[]): NumbersInfo[][][] {
  const resultArray: any = [];

  inputArray.forEach((inputString) => {
    const numbersInfo: NumbersInfo[] = [];

    let currentNumber = '';
    let startCol: number | null = null;

    for (let col = 0; col < inputString.length; col++) {
      const char = inputString[col];

      if (!isNaN(parseInt(char))) {
        if (startCol === null) {
          startCol = col;
        }
        currentNumber += char;
      } else {
        if (currentNumber !== '') {
          const endCol = col - 1;
          numbersInfo.push({
            startCol,
            endCol,
            value: currentNumber,
            match: false,
          });

          currentNumber = '';
          startCol = null;
        }
      }
    }

    if (currentNumber !== '') {
      const endCol = inputString.length - 1;
      numbersInfo.push({
        startCol,
        endCol,
        value: currentNumber,
        match: false,
      });
    }

    resultArray.push(numbersInfo);
  });

  return resultArray;
}

const output: NumbersInfo[][][] = extractNumbersInfoForArray(inputArray);

function isMatch(str: string): boolean {
  return str.match(/[^.0-9]/) !== null;
}

function filterOutput(
  output: NumbersInfo[][][],
  inputArray: string[]
): NumbersInfo[][][] {
  return output.map((arr, index) => {
    const currentString = inputArray[index];
    const previousString = index > 0 ? inputArray[index - 1] : null;
    const nextString =
      index < inputArray.length - 1 ? inputArray[index + 1] : null;

    return arr.map((obj) => {
      const { startCol, endCol }: any = obj;

      const adjustedStartCol = Math.max(0, startCol - 1);
      const adjustedEndCol = Math.min(currentString.length - 1, endCol + 1);

      const mergedString =
        (previousString
          ? previousString.substring(adjustedStartCol, adjustedEndCol + 1)
          : '') +
        currentString.substring(adjustedStartCol, adjustedEndCol + 1) +
        (nextString
          ? nextString.substring(adjustedStartCol, adjustedEndCol + 1)
          : '');

      const isMatched = isMatch(mergedString);

      return {
        ...obj,
        match: isMatched,
      };
    });
  });
}

const filteredOutput: NumbersInfo[][][] = filterOutput(output, inputArray);

const matchingPartNumbersSum: number = filteredOutput
  .flatMap((arr: any[]) => {
    return arr.filter((obj) => obj.match).map((obj) => parseInt(obj.value, 10));
  })
  .reduce((sum, value) => sum + value, 0);

console.log(`Sum of all matching part numbers (1): ${matchingPartNumbersSum}`);

// Part 2

function findAsterisks(inputArray: string[]): { asteriskCol: number }[][] {
  return inputArray.map((inputString) => {
    const asteriskPositions: { asteriskCol: number }[] = [];

    for (let col = 0; col < inputString.length; col++) {
      const char = inputString[col];

      if (char === '*') {
        asteriskPositions.push({ asteriskCol: col });
      }
    }

    return asteriskPositions;
  });
}

const asteriskPositions = findAsterisks(inputArray);

const gearMatches: any[] = asteriskPositions.map((subArray, subArrayIndex) =>
  subArray.map((obj) => {
    let matches: number[] = [];
    for (let i = -1; i < 2; i++) {
      for (let o = 0; o < filteredOutput[subArrayIndex + i].length; o++) {
        let a: any = filteredOutput[subArrayIndex + i][o];
        let b: any = obj.asteriskCol;
        if (a) {
          if (
            a.startCol === b ||
            a.endCol === b ||
            a.startCol === b - 1 ||
            a.endCol === b - 1 ||
            a.startCol === b + 1 ||
            a.endCol === b + 1
          ) {
            matches.push(parseInt(a.value));
          }
        }
      }
    }

    if (matches.length === 2) {
      let gearRatio: number = matches.reduce((a, b) => a * b);
      return { gearRatio };
    }
  })
);

const gearRatiosSum = gearMatches
  .flat()
  .filter((match) => match !== undefined)
  .map((match) => match.gearRatio)
  .reduce((a, b) => a + b);

console.log(`Sum of all gear ratios (2): ${gearRatiosSum}`);
