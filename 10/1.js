import * as fs from 'fs';

const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];

function solution() {
  const input = fs
    .readFileSync('./10/input.txt', { encoding: 'utf8', flag: 'r' })
    .split('\n')
    .map(row => row.split('').map(Number))
  const trailHeads = [];

  for (let i = 0; i < input.length; i++) {
    let row = input[i];

    for (let j = 0; j < row.length; j++) {
      let cell = row[j]

      if (cell === 0) trailHeads.push([i, j]);
    }
  }

  let result = 0;
  for (const trailHead of trailHeads) {
    result += getScore(trailHead);
  }

  return result;

  function getScore(position, currentHeight = 0, destinations = new Set) {
    const [i, j] = position;
    let positionHeight = input[i][j];

    if (currentHeight !== positionHeight) return;
    if (currentHeight === 9 && positionHeight === 9) {
      destinations.add([i, j].join());
    }

    for (const dir of dirs) {
      const newI = i + dir[0];
      const newJ = j + dir[1];

      if (newI >= 0 && newI < input.length && newJ >= 0 && newJ <= input[0].length) {
        getScore([newI, newJ], currentHeight + 1, destinations);
      }
    }

    return destinations.size;
  }
}

console.log(solution());
