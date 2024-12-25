import * as fs from 'fs';

function solution() {
  const input = fs.readFileSync('./17/input.txt', { encoding: 'utf8', flag: 'r' }).split('\n')

  let a;
  let b;
  let c;
  let program;

  let readingRegisters = true;
  for (let row of input) {
    if (!row) {
      readingRegisters = false;
      continue;
    }

    if (readingRegisters) {
      let [, register, value] = row.split(' ');

      if (register.startsWith('A')) {
        a = Number(value);
      } else if (register.startsWith('B')) {
        b = Number(value);
      } else if (register.startsWith('C')) {
        c = Number(value);
      }
    } else {
      program = row.split(' ')[1].split(',').map(Number);
    }
  }

  let result = '';
  for (let i = 0; i < program.length; i += 2) {
    let instruction = program[i];
    let operand = program[i+1];

    let comboOperand;
    if (operand <= 3) {
      comboOperand = operand;
    } else if (operand === 4) {
      comboOperand = a;
    } else if (operand === 5) {
      comboOperand = b;
    } else if (operand === 6) {
      comboOperand = c;
    }

    switch (instruction) {
      case 0: {
        a = Math.floor(a / (2 ** comboOperand));
        break;
      }
      case 1: {
        b = Math.floor(b ^ operand);
        break;
      }
      case 2: {
        b = Math.floor(comboOperand % 8);
        break;
      }
      case 3: {
        if (a === 0) break;

        // Jump instruction pointer to value of operand, account for loop increment
        i = operand - 2;
        break;
      }
      case 4: {
        b = Math.floor(b ^ c);
        break;
      }
      case 5: {
        result += (Math.floor(comboOperand % 8)) + ',';
        break;
      }
      case 6: {
        b = Math.floor(a / (2 ** comboOperand));
        break;
      }
      case 7: {
        c = Math.floor(a / (2 ** comboOperand));
        break;
      }
    }

  }

  console.log('A: ', a)
  console.log('B: ', b)
  console.log('C: ', c)

  return result.slice(0, result.length - 1);
}

console.log(solution());