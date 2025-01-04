import * as fs from 'fs';

function solution() {
  const input = fs.readFileSync('./19/input.txt', { encoding: 'utf8', flag: 'r' }).split('\n')

  const towels = new Set(input[0].split(', '));
  const designs = input.slice(2, input.length);

  let result = 0;
  for (let design of designs) {
    if (isValidDesign(design, towels)) result++;
  }

  return result;
}

function isValidDesign(design, towels, left = 0, right = 0) {
    let segment = design.slice(left, right + 1);

    if (left >= design.length) return true;
    if (right > design.length) return false;

    if (towels.has(segment)) {
      let continued = isValidDesign(design, towels, right + 1, right + 1);
      let alternative = isValidDesign(design, towels, left, right + 1);
      return continued || alternative;
    } else {
      return isValidDesign(design, towels, left, right + 1);
    }
}

console.log(solution());

// function solution() {
//   const input = fs.readFileSync('./19/input.txt', { encoding: 'utf8', flag: 'r' }).split('\n')

//   const TOWELS = input[0].split(', ');
//   const DESIGNS = input.slice(2, input.length);
//   const MAX_DESIGN_LENGTH = Math.max(...DESIGNS.map(design => design.length));

//   const possibleDesigns = getPossibleDesigns(TOWELS, MAX_DESIGN_LENGTH);

//   let result = 0;
//   for (let design of DESIGNS) {
//     if (possibleDesigns.has(design)) result++;
//   }

//   return result;
// }

// function getPossibleDesigns(towels, maxLength, currentDesign = '', possibleDesigns = new Set) {
//   for (let towel of towels) {
//     let nextDesign = currentDesign + towel;

//     if (nextDesign.length <= maxLength) {
//       possibleDesigns.add(nextDesign);
//       getPossibleDesigns(towels, maxLength, nextDesign, possibleDesigns);
//     }
//   }

//   return possibleDesigns;
// }

// console.log(solution());