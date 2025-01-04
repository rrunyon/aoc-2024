import * as fs from 'fs';
import { Queue } from '@datastructures-js/queue';

const SIZE = 70;
const BYTES = 1024;

const DIRS = [[0, 1], [1, 0], [0, -1], [-1, 0]];

function solution() {
  const input = fs.readFileSync('./18/input.txt', { encoding: 'utf8', flag: 'r' }).split('\n')

  let corrupted = new Set;
  for (let i = 0; i < BYTES; i++) {
    corrupted.add(input[i]);
  }

  let queue = new Queue;
  let visited = new Set;
  let startKey = '0,0';
  queue.enqueue({ position: startKey, steps: 0 });
  visited.add(startKey);

  while (queue.size()) {
    let { position, steps } = queue.dequeue();
    let [x, y] = position.split(',').map(Number);

    if (x === SIZE && y === SIZE) {
      return steps;
    }

    for (let dir of DIRS) {
      let newX = x + dir[0];
      let newY = y + dir[1];
      let newKey = [newX, newY].join();

      if (newX >= 0 && newX <= SIZE && newY >= 0 && newY <= SIZE && !visited.has(newKey) && !corrupted.has(newKey)) {
        queue.enqueue({ position: newKey, steps: steps + 1 });
        visited.add(newKey);
      }
    }
  }
}

console.log(solution());