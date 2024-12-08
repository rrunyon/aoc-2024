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
    let add = validate(equation, index + 1, total + currentOperand)
    let multiply = validate(equation, index + 1, total * currentOperand)
    let concatenate = validate(equation, index + 1, Number(String(total) + String(currentOperand)))

    return Math.max(add, multiply, concatenate)
  }
}

console.log(solution());