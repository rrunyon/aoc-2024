import * as fs from 'fs';

function solution() {
  let input = fs.readFileSync('./01/input.txt', { encoding: 'utf8', flag: 'r' }).split('\n');

  let leftCol = [];
  let rightCol = [];

  for (let row of input) {
    if (!row) continue;

    let [left, right] = row.split(' ').filter(val => val);
    leftCol.push(Number(left));
    rightCol.push(Number(right));
  }

  leftCol.sort((a, b) => a - b);
  rightCol.sort((a, b) => a - b);

  let total = 0;
  for (let i = 0; i < leftCol.length; i++) {
    total += Math.abs(leftCol[i] - rightCol[i]);
  }

  return total;
}

console.log(solution());
