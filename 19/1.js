import * as fs from 'fs';

function solution() {
  const input = fs.readFileSync('./19/input.txt', { encoding: 'utf8', flag: 'r' }).split('\n')

  const towels = new Set(input[0].split(', '));
  const designs = input.slice(2, input.length);

  let result = 0;
  for (let design of designs) {
    if (isValidDesign(design, towels)) {
      result++;
    }
  }

  return result;
}

function isValidDesign(design, towels, left = 0, right = 0) {
    let segment = design.slice(left, right + 1);

    if (left >= design.length) return true;
    if (right > design.length) return false;

    if (towels.has(segment) && isValidDesign(design, towels, right + 1, right + 1)) {
      return true;
    } else {
      return isValidDesign(design, towels, left, right + 1);
    }

}

console.log(solution());