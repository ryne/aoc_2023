const JFile = require('jfile');

const data = new JFile('data.txt');
const result = data.lines
  .map((line) => line.replace(/\D+/g, ''))
  .map((line) => (line.length === 1 ? line + line : line))
  .map((line) => Number(line.charAt(0) + line.charAt(line.length - 1)))
  .reduce((a, b) => a + b);

console.log(result);
