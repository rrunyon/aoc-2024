import * as fs from 'fs';

function solution() {
  let input = fs.readFileSync('./03/input.txt', { encoding: 'utf8', flag: 'r' }).split('\n');
}

console.log(solution());
