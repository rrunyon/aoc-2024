import * as fs from 'fs';

function solution() {
  const input = fs.readFileSync('./15/input.txt', { encoding: 'utf8', flag: 'r' }).split('\n')
  let graph = [];
  let moves = [];

  let isGraph = true;
  for (let row of input) {
    if (!row) isGraph = false;

    if (isGraph) {
      graph.push(row.split(''));
    } else {
      moves.push(row);
    }
  }

  moves = moves.flat().join('');
  let currentPosition;

  for (let i = 0; i < graph.length; i++) {
    for (let j = 0; j < graph[0].length; j++) {
      let cell = graph[i][j];
      if (cell === '@') {
        currentPosition = [i, j];
        graph[i][j] = '.';
      }
    }
  }

  const MOVES = {
    '>': [0, 1],
    '<': [0, -1],
    '^': [-1, 0],
    'v': [1, 0],
  }

  for (let move of moves) {
    // printGraph(graph, currentPosition);
    // console.log(move);

    let shift = MOVES[move];
    let nextI = currentPosition[0] + shift[0];
    let nextJ = currentPosition[1] + shift[1];
    let nextCell = graph[nextI][nextJ];

    if (nextCell === '#') continue;

    if (nextCell === '.') {
      graph[currentPosition[0]][currentPosition[1]] = '.';
      currentPosition = [nextI, nextJ];
      graph[currentPosition[0]][currentPosition[1]] = '@';
      continue;
    }

    if (nextCell === 'O') {
      let box = [nextI, nextJ];
      let boxCell = graph[box[0]][box[1]];

      while (boxCell === 'O') {
        box = [box[0] + shift[0], box[1] + shift[1]];
        boxCell = graph[box[0]][box[1]];
      }

      if (boxCell === '.') {
        graph[currentPosition[0]][currentPosition[1]] = '.';
        graph[box[0]][box[1]] = 'O';
        currentPosition = [nextI, nextJ];
        graph[currentPosition[0]][currentPosition[1]] = '@';
      }
    }
  }

  // printGraph(graph, currentPosition);
  let result = 0;

  for (let i = 0; i < graph.length; i++) {
    for (let j = 0; j < graph[0].length; j++) {
      let cell = graph[i][j];
      if (cell === 'O') {
        result += (100 * i) + j;
      }
    }
  }

  return result;
}

function printGraph(graph, currentPosition) {
  for (let i = 0; i < graph.length; i++) {
    let row = [];

    for (let j = 0; j < graph[0].length; j++) {
      let cell = (currentPosition[0] === i && currentPosition[1] === j) ? '@' : graph[i][j];
      row.push(cell);
    }

    console.log(row.join(''));
  }

  console.log('\n');
}

console.log(solution());