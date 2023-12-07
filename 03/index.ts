import { loadPuzzleInput } from '../helpers';
const inputArray = await loadPuzzleInput('input.txt');

function extractNumbersInfoForArray(inputArray: string[]): any {
  const resultArray: any = [];

  inputArray.forEach((inputString) => {
    const numbersInfo: {
      startCol: number | null;
      endCol: number;
      value: string;
      match: boolean;
    }[] = [];

    let currentNumber = '';
    let startCol: number | null = null;

    for (let col = 0; col < inputString.length; col++) {
      const char = inputString[col];

      if (!isNaN(parseInt(char)) && char !== ' ') {
        // If the character is a digit, start or continue building the currentNumber
        if (startCol === null) {
          // If startCol is null, it means this is the start of a new number
          startCol = col;
        }
        currentNumber += char;
      } else {
        // If the character is not a digit, check if we were building a number
        if (currentNumber !== '') {
          // If we were building a number, save the information in the numbersInfo array
          const endCol = col - 1;
          numbersInfo.push({
            startCol,
            endCol,
            value: currentNumber,
            match: false,
          });

          // Reset for the next number
          currentNumber = '';
          startCol = null;
        }
      }
    }

    // Check for the last number in case the string ends with a number
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

const output: number[][][] = extractNumbersInfoForArray(inputArray);

function isMatch(str: string): boolean {
  return str.match(/[^.0-9]/) !== null;
}

function filterOutput(output: number[][][], inputArray: string[]): any[][][] {
  return output.map((arr, index) => {
    const currentString = inputArray[index];
    const previousString = index > 0 ? inputArray[index - 1] : null;
    const nextString =
      index < inputArray.length - 1 ? inputArray[index + 1] : null;

    return arr.map((obj) => {
      const { startCol, endCol }: any = obj;

      // Adjust column range based on conditions
      const adjustedStartCol = Math.max(0, startCol - 1);
      const adjustedEndCol = Math.min(currentString.length - 1, endCol + 1);

      // Extract the substring based on the adjusted column range
      const mergedString =
        (previousString
          ? previousString.substring(adjustedStartCol, adjustedEndCol + 1)
          : '') +
        currentString.substring(adjustedStartCol, adjustedEndCol + 1) +
        (nextString
          ? nextString.substring(adjustedStartCol, adjustedEndCol + 1)
          : '');

      // Check if any characters in the merged string match conditions
      const isMatched = isMatch(mergedString);

      return {
        ...obj,
        match: isMatched,
      };
    });
  });
}

const filteredOutput: any[][] = filterOutput(output, inputArray);

const matchingPartNumbersSum: number = filteredOutput
  .flatMap((arr) => {
    return arr.filter((obj) => obj.match).map((obj) => parseInt(obj.value, 10));
  })
  .reduce((sum, value) => sum + value, 0);

console.log(`Sum of all matching part numbers (1): ${matchingPartNumbersSum}`);
