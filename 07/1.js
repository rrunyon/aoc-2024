import * as fs from 'fs';

function solution() {
  let input = fs.readFileSync('./07/input.txt', { encoding: 'utf8', flag: 'r' }).split('\n');

  let equations = [];
  for (let row of input) {
    let [testValue, operands] = row.split(': ');
    testValue = Number(testValue);
    operands = operands.split(' ').map(Number);
    equations.push({ testValue, operands });
  }

  let result = 0;
  for (let equation of equations) {
    result += validate(equation);
  }

  return result;

  function validate(equation, index = 0, total = 0) {
    const { testValue, operands } = equation;
    if (index === operands.length) {
      return total === testValue ? testValue : 0;
    }

    let currentOperand = operands[index];
    let left = validate(equation, index + 1, total + currentOperand)
    let right = validate(equation, index + 1, total * currentOperand)

    return Math.max(left, right)
  }
}

console.log(solution());
