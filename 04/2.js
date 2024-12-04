import * as fs from 'fs';

function solution() {
  let input = fs.readFileSync('./04/input.txt', { encoding: 'utf8', flag: 'r' }).split('\n');

  let total = 0;

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] === 'A') {
        try {
          const forwardDiagonal = [input[i-1][j+1], input[i][j], input[i+1][j-1]].join('');
          const backwardDiagonal = [input[i-1][j-1], input[i][j], input[i+1][j+1]].join('');
          if ((forwardDiagonal === 'MAS' || forwardDiagonal === 'SAM') && (backwardDiagonal === 'MAS' || backwardDiagonal === 'SAM')) total++;
        } catch {}
      }
    }
  }

  return total;
}

console.log(solution());
