import * as fs from 'fs';
import { Queue } from '@datastructures-js/queue';

function solution() {
  const input = fs.readFileSync('./20/input.txt', { encoding: 'utf8', flag: 'r' }).split('\n')

  let start;
  let end;

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      let cell = input[i][j];

      if (cell === 'S') {
        start = [i, j].join();
      } else if (cell == 'E') {
        end = [i, j].join();
      }
    }
  }

  let queue = new Queue;
  queue.enqueue({
    current: start,
    visited: new Set([start]),
    moves: 0,
  });

  const DIRS = [[0, 1], [1, 0], [-1, 0], [0, -1]];

  while (queue.size()) {
    let { current, visited, moves } = queue.dequeue();
    let [i, j] = current.split(',').map(Number);

    if (input[i][j] === '#') {
      continue;
    }

    if (current === end) {
      return moves;
    }

    for (let dir of DIRS) {
      let newI = i + dir[0];
      let newJ = j + dir[1];
      let next = [newI, newJ].join();

      if (newI >= 0 && newI < input.length && newJ >= 0 && newJ < input[0].length && !visited.has(next)) {
        let newVisited = new Set(visited);
        newVisited.add(next);
        queue.enqueue({
          current: next,
          visited: newVisited,
          moves: moves + 1,
        });
      }
    }
  }
}

console.log(solution());