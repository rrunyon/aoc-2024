import * as fs from 'fs';

const EXTRA = 10000000000000;
// const EXTRA = 0;

function solution() {
  const input = fs.readFileSync('./13/input.txt', { encoding: 'utf8', flag: 'r' }).split('\n')

  let machines = [];
  let currentMachine = {};
  for (let row of input) {
    if (row.startsWith('Button A') || row.startsWith('Button B')) {
      let [button, units] = row.split(': ');
      button = button.split(' ')[1];
      let [x, y] = units.split(', ').map(string => string.slice(2));

      currentMachine[button] = {};
      currentMachine[button].x = Number(x);
      currentMachine[button].y = Number(y);
    } else if (row.startsWith('Prize')) {
      let [x, y] = row.split(': ')[1].split(', ').map(string => string.slice(2));
      currentMachine.prize = { x: Number(x) + EXTRA, y: Number(y) + EXTRA };
    } else {
      machines.push(currentMachine);
      currentMachine = {};
    }
  }

  machines.push(currentMachine);

  let result = 0;

  for (const machine of machines) {
    let minimum = getMinimumTokens2(machine);
    if (minimum !== Infinity) result += minimum;
  }

  return result;
}

function getMinimumTokens(machine) {
  let result = Infinity;

  for (let i = 0; i < 101; i++) {
    for (let j = 0; j < 101; j++) {
      let x = machine.A.x * i + machine.B.x * j;
      let y = machine.A.y * i + machine.B.y * j;

      if (x === machine.prize.x && y === machine.prize.y) {
        result = Math.min(result, i * 3 + j)
      }
    }
  }

  return result;
}

function getMinimumTokens2(machine, currentX = 0, currentY = 0, tokens = 0, cache = new Map) {
  if (currentX === machine.prize.x && currentY === machine.prize.y) {
    return tokens;
  }

  if (currentX > machine.prize.x) {
    return Infinity;
  }

  if (currentY > machine.prize.y) {
    return Infinity;
  }

  let key = [currentX, currentY].join();
  let currentCache = cache.get(key) ?? Infinity;
  cache.set(key, Math.min(currentCache, tokens));

  let xDiff = machine.prize.x - currentX;
  let yDiff = machine.prize.y - currentY;
  let diffKey = [xDiff, yDiff].join();
  if (cache.has(diffKey)) {
    return tokens + cache.get(diffKey);
  }

  let left = getMinimumTokens2(machine, currentX + machine.A.x, currentY + machine.A.y, tokens + 3, cache);
  let right = getMinimumTokens2(machine, currentY + machine.B.y, currentY + machine.B.y, tokens + 1, cache);

  return Math.min(left, right);
}

console.log(solution());