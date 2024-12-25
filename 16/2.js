import { MinPriorityQueue } from '@datastructures-js/priority-queue';
import * as fs from 'fs';

const DIRECTIONS = [[0, 1], [-1, 0], [0, -1], [1, 0]];

class Node {
  constructor({ position, directionKey, g, h, steps, path }) {
    this.path = path;
    this.position = position;
    this.directionKey = directionKey;
    this.g = g;
    this.h = h;
    this.f = g + h;
    this.steps = steps;
  }

  get key() {
    return this.position.join();
  }
}

function aStar(graph, start, end) {
  let open = new MinPriorityQueue(node => node.f);

  let startNode1 = new Node({
    position: start,
    directionKey: 0,
    score: 0,
    g: 0,
    h: 0,
    steps: 1,
  });

  open.enqueue(startNode1);

  let visited = new Set;
  let bestPathNodes = new Set;

  while(open.size()) {
    let current = open.dequeue();

    let { position, directionKey } = current;
    let direction = DIRECTIONS[directionKey];
    let key = [position, directionKey].join();

    // if (visited.has(key)) continue;
    visited.add(key);

    if (current.position[0] === end[0] && current.position[1] === end[1]) {
      for (let node of current.path) {
        node = node.split(',').slice(0, 2).join();
        bestPathNodes.add(node);
      }
    }

    let nextI = position[0] + direction[0];
    let nextJ = position[1] + direction[1];
    let nextPosition = [nextI, nextJ];

    let nextKey = [nextI, nextJ, direction].join();

    if (!visited.has(nextKey) && graph[nextI][nextJ] !== '#') {
      visited.add(nextKey);
      let neighbor = new Node({
        path: new Set(current.path).add(nextPosition.join()),
        position: nextPosition,
        directionKey,
        g: current.g + 1,
        h: graph[nextI][nextJ],
        steps: current.steps + 1,
      });
      open.enqueue(neighbor);
    }

    let nextDirectionKeys = [directionKey -1, directionKey + 1].map(key => (key + 4) % 4);

    nextDirectionKeys.forEach(directionKey => {
      direction = DIRECTIONS[directionKey];
      let nextI = position[0] + direction[0];
      let nextJ = position[1] + direction[1];
      let nextPosition = [nextI, nextJ];
      let nextKey = [nextI, nextJ, direction].join();

      if (!visited.has(nextKey) && graph[nextI][nextJ] !== '#') {
        visited.add(nextKey);
        let neighbor = new Node({
          path: new Set(current.path).add(nextPosition.join()),
          position: nextPosition,
          directionKey,
          g: current.g + 1001,
          h: graph[nextI][nextJ],
          steps: current.steps + 1,
        });
        open.enqueue(neighbor);
      }
    });
  }

  return bestPathNodes.size;
}

function solution() {
  const input = fs.readFileSync('./16/input.txt', { encoding: 'utf8', flag: 'r' }).split('\n')

  let graph = [];
  for (let row of input) {
    graph.push(row.split(''));
  }

  let startPosition;
  let endPosition;
  for (let i = 0; i < graph.length; i++) {
    for (let j = 0; j < graph[0].length; j++) {
      let cell = graph[i][j];
      if (cell === 'S') startPosition = [i, j];
      if (cell === 'E') endPosition = [i, j];
    }
  }

  for (let i = 0; i < graph.length; i++) {
    for (let j = 0; j < graph[0].length; j++) {
      let cell = graph[i][j];
      if (cell === '.') {
        let deltaI = Math.abs(i - startPosition[0]);
        let deltaJ = Math.abs(j - startPosition[1]);
        graph[i][j] = deltaI + deltaJ;
      }
    }
  }

  return aStar(graph, startPosition, endPosition);
 
  function printState(position, score, directionKey, visiting) {
    console.log("Score: ", score);

    for (let i = 0; i < graph.length; i++) {
      let row = [];

      for (let j = 0; j < graph[0].length; j++) {
        let key = [i, j].join();
        let cell = graph[i][j];

        if (visiting.has(key)) {
          row.push('-');
        } else if (position[0] === i && position[1] === j) {
          row.push('C');
        } else {
          row.push(cell);
        }
      }

      console.log(row.join(''));
    }
    console.log('\n');
  }
}

console.log(solution());