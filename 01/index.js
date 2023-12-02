const JFile = require('jfile');

const myF = new JFile('data.txt');
const array = myF.lines.map((line) => line.replace(/\D+/g, ''));

console.log(array);
