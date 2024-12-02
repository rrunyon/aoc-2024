import * as fs from 'fs';

function solution() {
  let input = fs.readFileSync('./01/input.txt', { encoding: 'utf8', flag: 'r' }).split('\n');

  let rightFrequencyMap = new Map;

  for (let row of input) {
    if (!row) continue;

    let [, right] = row.split(' ').filter(val => val);
    rightFrequencyMap.set(right, (rightFrequencyMap.get(right) ?? 0) + 1);
  }

  let total = 0;
  for (let row of input) {
    if (!row) continue;

    let [left] = row.split(' ').filter(val => val);
    total += left * (rightFrequencyMap.get(left) ?? 0);
  }

  return total;
}

console.log(solution());