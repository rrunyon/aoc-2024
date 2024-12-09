import * as fs from 'fs';

/*
Array
Two pointer

Build array from input representing the memory layout. Also build map of array index to file ID. Perform defragging
operation, updating the map as elements are shifted. Compute the checksum and return.
*/

function solution() {
  const input = fs.readFileSync('./09/input.txt', { encoding: 'utf8', flag: 'r' }).split('\n');

  let blocks = [];
  let fileCounter = 0;
  let isFile = true;

  for (let count of input[0].split('').map(Number)) {
    for (let i = 0; i < count; i++) {
      if (isFile) {
        blocks.push(String(fileCounter));
      } else {
        blocks.push('.');
      }
    }

    if (isFile) fileCounter++;
    isFile = !isFile
  }

  let left = 0;
  let right = blocks.length - 1;

  while (left !== right) {
    let leftChar = blocks[left];
    let rightChar = blocks[right];

    if (leftChar !== '.') {
      left++;
      continue;
    }

    if (rightChar === '.') {
      right--;
      continue;
    }

    blocks[left] = blocks[right];
    blocks[right] = '.';
    left++;
    right--;
  }

  let checksum = 0;
  for (let i = 0; i < blocks.length; i++) {
    let fileId = blocks[i];
    if (fileId === '.') break;

    checksum += i * Number(fileId);
  }

  return checksum;
}

console.log(solution());
