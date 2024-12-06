import * as fs from 'fs';

function solution() {
  let input = fs.readFileSync('./06/input.txt', { encoding: 'utf8', flag: 'r' }).split('\n');

  let start;
  let obstacles = new Set;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      let cell = input[i][j];

      if (cell === '^') {
        start = [i, j];
      } else if (cell === '#') {
        obstacles.add([i, j].join());
      }
    }
  }

  let visited = new Set;
  let dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  let currentDir = 0;
  let current = start;
  while (true) {
    visited.add(current.join())

    let dir = dirs[currentDir];
    let nextI = current[0] + dir[0];
    let nextJ = current[1] + dir[1];
    let key = [nextI, nextJ].join();

    if (nextI < 0 || nextI >= input.length || nextJ < 0 || nextJ >= input[0].length) {
      break;
    } else if (obstacles.has(key)) {
      currentDir = (currentDir + 1) % 4
    } else {
      current = [nextI, nextJ];
    }
  }

  return visited.size;
}

console.log(solution());
