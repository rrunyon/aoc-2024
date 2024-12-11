import * as fs from 'fs';

const BLINKS = 25;

function solution() {
  const input = fs.readFileSync('./11/input.txt', { encoding: 'utf8', flag: 'r' }).split('\n')
  
  let stones = input[0].split(' ');

  for (let i = 0; i < BLINKS; i++) {
    for (let i = 0; i < stones.length; i++) {
      let stone = stones[i];

      if (stone === '0') {
        stones[i] = '1';
      } else if (stone.length % 2 === 0) {
        let half = stone.length / 2;
        let left = Number(stone.slice(0, half));
        let right = Number(stone.slice(half));

        stones = [...stones.slice(0, i), String(left), String(right), ...stones.slice(i + 1)];
        i++;
      } else {
        stones[i] = String(Number(stone) * 2024);
      }
    }

    console.log("Blink: ", i + 1);
    console.log(stones);
  }

  return stones.length;
}

console.log(solution());