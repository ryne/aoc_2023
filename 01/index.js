const JFile = require('jfile');
const data = new JFile('data.txt');
const numbersMap = {
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

function convertSubstring(inputString) {
  // Iterate through the keys (substrings) in the numbersMap
  for (const number in numbersMap) {
    if (Object.hasOwn(numbersMap, number))
      // Replace occurrences of the key with its corresponding value in the inputString
      inputString = inputString.split(number).join(numbersMap[number]);
  }

  return inputString;
}

const calibrationValuesSum = data.lines
  .map((string) => convertSubstring(string).replace(/\D+/g, ''))
  .map((string) => (string.length === 1 ? string + string : string))
  .map((string) => Number(string.charAt(0) + string.charAt(string.length - 1)))
  .reduce((a, b) => a + b);

console.log(calibrationValuesSum);
