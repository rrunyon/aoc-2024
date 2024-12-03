import * as fs from 'fs';

function solution() {
  let input = fs.readFileSync('./03/input.txt', { encoding: 'utf8', flag: 'r' });

  const pattern = /mul\((\d+),(\d+)\)/g;
  const matches = Array.from(input.matchAll(pattern));

  let total = 0;
  for (let [, left, right] of matches) {
    total += Number(left) * Number(right);
  }

  return total;
}

console.log(solution());
