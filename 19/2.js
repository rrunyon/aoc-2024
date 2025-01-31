import * as fs from 'fs';

function solution() {
  const input = fs.readFileSync('./19/input.txt', { encoding: 'utf8', flag: 'r' }).split('\n')

  const towels = new Set(input[0].split(', '));
  const designs = input.slice(2, input.length);

  let total = BigInt(0);
  for (let design of designs) {
    total += BigInt(countValidDesigns(design, towels));
  }

  return total;
}

function countValidDesigns(design, towels, left = 0, right = 0, cache = new Map) {
    let segment = design.slice(left, right + 1);

    if (cache.has(segment)) {
      return cache.get(segment);
    }

    if (left >= design.length) {
      return 1;
    } else if (right >= design.length) {
      return 0;
    }

    let count = 0;
    if (towels.has(segment)) {
      count += countValidDesigns(design, towels, right + 1, right + 1, cache);
    }
    count += countValidDesigns(design, towels, left, right + 1, cache);

    cache.set(segment, Math.max(cache.get(segment) ?? 0, count));

    return count;
}

console.log(solution());