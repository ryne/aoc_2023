const JFile = require('jfile');

const data = new JFile('data.txt');
const digitsMap = {
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
  // Iterate through the keys (substrings) in the digitsMap
  for (const key in digitsMap) {
    if (digitsMap.hasOwnProperty(key)) {
      // Replace occurrences of the key with its corresponding value in the inputString
      inputString = inputString.split(key).join(digitsMap[key]);
    }
  }

  return inputString;
}

const result = data.lines
  .map((line) => convertSubstring(line))
  .map((line) => line.replace(/\D+/g, ''))
  .map((line) => (line.length === 1 ? line + line : line))
  .map((line) => Number(line.charAt(0) + line.charAt(line.length - 1)))
  .reduce((a, b) => a + b);

console.log(result);
