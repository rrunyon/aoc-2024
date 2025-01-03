import * as fs from 'fs';

/*
Split on "don't()" and "do()"

Split on don't first, then split each segment again on do, and ignore the first segment of each subsegment
*/
function solution() {
  let input = fs.readFileSync('./03/input.txt', { encoding: 'utf8', flag: 'r' });

  let split = input.split("don't()");
  split = split.map(segment => segment.split("do()"));

  const pattern = /mul\((\d+),(\d+)\)/g;

  let total = 0;
  for (let i = 0; i < split.length; i++) {
    let segment = split[i];

    for (let j = 0; j < segment.length; j++) {
      // Leftmost subsegment of each segment is don't, except for the first segment
      if (i !== 0 && j === 0) continue;

      let subsegment = segment[j];
      const matches = Array.from(subsegment.matchAll(pattern));

      for (let [, left, right] of matches) {
        total += Number(left) * Number(right);
      }
    }
  }

  return total;
}

console.log(solution());