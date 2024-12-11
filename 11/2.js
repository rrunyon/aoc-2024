import * as fs from 'fs';

const BLINKS = 75;

function solution() {
  const input = fs.readFileSync('./11/input.txt', { encoding: 'utf8', flag: 'r' }).split('\n')
  
  let stones = input[0].split(' ');
  let cache = new Map;

  stones.forEach(stone => cache.set(stone, 1));

  let lastCache;
  let newCache = cache;
  for (let i = 0; i < BLINKS; i++) {
    lastCache = newCache;
    newCache = new Map;

    for (const [stone, count] of lastCache) {
      if (stone === '0') {
        newCache.set('1', (newCache.get('1') ?? 0) + count);
      } else if (stone.length % 2 === 0) {
        let half = stone.length / 2;
        let left = String(Number(stone.slice(0, half)));
        let right = String(Number(stone.slice(half)));

        newCache.set(left, (newCache.get(left) ?? 0) + count);
        newCache.set(right, (newCache.get(right) ?? 0) + count);
      } else {
        let newVal = String(Number(stone) * 2024);
        newCache.set(newVal, (newCache.get(newVal) ?? 0) + count);
      }
    }

    console.log(newCache);
  }

  return [...newCache.values()].reduce((a, b) => a + b);
}

console.log(solution());