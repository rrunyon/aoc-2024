import * as fs from 'fs';

function solution() {
  const input = fs.readFileSync('./24/input.txt', { encoding: 'utf8', flag: 'r' }).split('\n')

  const wires = new Map;
  const gates = [];

  let isWires = true;
  for (let row of input) {
    if (!row) {
      isWires = false;
      continue;
    }

    if (isWires) {
      let [wire, value] = row.split(': ');
      wires.set(wire, Number(value));
    } else {
      gates.push({ gate: row, processed: false });
    }
  }

  let processedCount = 0;
  while (processedCount < gates.length) {
    for (let gate of gates) {
      if (gate.processed) continue;

      let [left, operator, right, , output] = gate.gate.split(' ');

      let leftVal = wires.get(left);
      let rightVal = wires.get(right);

      if (leftVal === undefined || rightVal === undefined) continue;

      if (operator === 'AND') {
        wires.set(output, leftVal + rightVal === 2 ? 1 : 0);
      } else if (operator === 'OR') {
        wires.set(output, leftVal + rightVal >= 1 ? 1 : 0);
      } else if (operator === 'XOR') {
        wires.set(output, leftVal + rightVal === 1 ? 1 : 0);
      }

      gate.processed = true;
      processedCount++;
    }
  }

  const zKeys = Array.from(wires.keys()).filter(key => key.startsWith('z')).sort();

  let result = '';
  for (let key of zKeys) {
    result = wires.get(key) + result;
  }

  return parseInt(result, 2);
  // return BigInt('0b' + result);
}

console.log(solution());