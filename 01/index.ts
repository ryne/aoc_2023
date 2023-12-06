import { loadPuzzleInput } from '../helpers';
const data = await loadPuzzleInput('input.txt');

const numbersMap: Record<string, string> = {
  oneight: '18',
  twone: '21',
  eightwo: '82',
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
};

function convertSubstring(inputString: string) {
  // Iterate through the keys (substrings) in the numbersMap
  for (const number in numbersMap) {
    if (numbersMap.hasOwnProperty(number))
      // Replace occurrences of the key with its corresponding value in the inputString
      inputString = inputString.split(number).join(numbersMap[number]);
  }

  return inputString;
}

const calibrationValuesSumOne: number = data
  .map((line) => line.replace(/\D+/g, ''))
  .map((line) => (line.length === 1 ? line + line : line))
  .map((line) => Number(line.charAt(0) + line.charAt(line.length - 1)))
  .reduce((a, b) => a + b);

const calibrationValuesSumTwo: number = data
  .map((string) => convertSubstring(string).replace(/\D+/g, ''))
  .map((string) => (string.length === 1 ? string + string : string))
  .map((string) => Number(string.charAt(0) + string.charAt(string.length - 1)))
  .reduce((a, b) => a + b);

console.log(`Sum of Calibration Values (1): ${calibrationValuesSumOne}`);
console.log(`Sum of Calibration Values (2): ${calibrationValuesSumTwo}`);
