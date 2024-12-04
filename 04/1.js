import * as fs from 'fs';

const XMAS = 'XMAS';
const SAMX = 'SAMX';

function solution() {
  let input = fs.readFileSync('./04/input.txt', { encoding: 'utf8', flag: 'r' }).split('\n');

  let total = 0;

  // horizontal
  for (let i = 0; i < input.length; i++) {
    let row = input[i];

    for (let j = 0; j < row.length; j++) {
      if (row.slice(j, j + 4) === XMAS) total++;
      if (row.slice(j, j + 4) === SAMX) total++;

      // diagonal
      try {
        const forwardDiagonal = [input[i][j], input[i+1][j+1], input[i+2][j+2], input[i+3][j+3]].join('');
        if (forwardDiagonal === XMAS || forwardDiagonal === SAMX) total++;
      } catch {}
      try {
        const backwardDiagonal = [input[i][j], input[i+1][j-1], input[i+2][j-2], input[i+3][j-3]].join('');
        if (backwardDiagonal === XMAS || backwardDiagonal === SAMX) total++;
      } catch {}
    }
  }

  // vertical
  for (let i = 0; i < input[0].length; i++) {
    for (let j = 0; j < input.length - 3; j++) {
      if (input[j][i] === 'X' && input[j+1][i] === 'M' && input[j+2][i] === 'A' && input[j+3][i] === 'S') total++;
      if (input[j][i] === 'S' && input[j+1][i] === 'A' && input[j+2][i] === 'M' && input[j+3][i] === 'X') total++;
    }
  }

  return total;
}

console.log(solution());
