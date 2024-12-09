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

  let right = blocks.length - 1;
  let handlingFileId = Math.max(...blocks.filter(block => block !== '.'));
  let leftStart = 0;

  while (handlingFileId > 0) {
    console.log(handlingFileId);
    // console.log(blocks.join(''));
    // console.log()

    let handlingFileIdString = String(handlingFileId);
    let rightEnd = right;

    while (blocks[rightEnd] !== handlingFileIdString && rightEnd >= 0) rightEnd--;
    let rightStart = rightEnd;
    while (blocks[rightStart - 1] === handlingFileIdString && rightStart >= 0) rightStart--;

    while (blocks[leftStart] !== '.' && leftStart < blocks.length) leftStart++;
    let leftEnd = leftStart;
    while (blocks[leftEnd + 1] === '.' && leftEnd < blocks.length) leftEnd++;

    if (leftStart >= rightStart || leftEnd >= rightStart) {
      handlingFileId--;
      leftStart = 0;
      continue;
    }

    let blockSize = rightEnd - rightStart + 1;

    if (blockSize <= (leftEnd - leftStart + 1)) {
      for (let i = 0; i < blockSize; i++) {
        blocks[leftStart + i] = handlingFileIdString;
        blocks[rightEnd - i] = '.';
      }

      handlingFileId--;
      leftStart = 0;
      continue;
    } else {
      leftStart = leftEnd + 1;

      if (leftStart >= blocks.length) {
        handlingFileId--;
        leftStart = 0;
        continue;
      }
    }
  }

  let checksum = 0;
  for (let i = 0; i < blocks.length; i++) {
    let fileId = blocks[i];
    if (fileId === '.') continue;

    checksum += i * Number(fileId);
  }

  return checksum;
}

console.log(solution());
