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

  let result = 0;
  let dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]];

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      let newObstacleKey = [i, j].join();
      // Avoid testing and then removing an existing obstacle
      if (obstacles.has(newObstacleKey)) continue;

      obstacles.add(newObstacleKey);

      let visited = new Set;
      let currentDir = 0;
      let current = start;
      while (true) {
        let currentKey = [...current, currentDir].join();

        if (visited.has(currentKey)) {
          result++;
          break;
        }

        let dir = dirs[currentDir];
        let nextI = current[0] + dir[0];
        let nextJ = current[1] + dir[1];
        let key = [nextI, nextJ].join();

        if (nextI < 0 || nextI >= input.length || nextJ < 0 || nextJ >= input[0].length) {
          break;
        } else if (obstacles.has(key)) {
          currentDir = (currentDir + 1) % 4
        } else {
          visited.add(currentKey)
          current = [nextI, nextJ];
        }
      }

      obstacles.delete(newObstacleKey);
    }
  }

  return result;
}

console.log(solution());
