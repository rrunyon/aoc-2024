import * as fs from 'fs';

const Directions = {
  INCREASING: 'INCREASING',
  DECREASING: 'DECREASING'
};

function isSafe(levels) {
  let direction;

  for (let i = 0; i < levels.length - 1; i++) {
    let current = levels[i];
    let next = levels[i + 1];

    if (current === next) return false;

    if (!direction) {
      direction = current < next ? Directions.INCREASING : Directions.DECREASING;
    }

    if (direction === Directions.INCREASING && current > next) return false;
    if (direction === Directions.DECREASING && current < next) return false;
    if (Math.abs(current - next) > 3) return false;
  }

  return true;
}

function solution() {
  let input = fs.readFileSync('./02/input.txt', { encoding: 'utf8', flag: 'r' }).split('\n');

  return input.filter(row => {
    row = row.split(' ').map(Number);
    if (isSafe(row)) return true;

    for (let i = 0; i < row.length; i++) {
      let dampened = [...row.slice(0, i), ...row.slice(i + 1, row.length)];
      if (isSafe(dampened)) return true;
    }

    return false;
  }).length;
}

console.log(solution());
