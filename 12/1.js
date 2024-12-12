import * as fs from 'fs';
import { Queue } from "@datastructures-js/queue";

const DIRS = [[0, 1], [1, 0], [-1, 0], [0, -1]];

function solution() {
  const input = fs.readFileSync('./12/input.txt', { encoding: 'utf8', flag: 'r' }).split('\n')

  const graph = input.map(row => row.split(''));
  const regions = [];
  const visited = new Set;

  for (let i = 0; i < graph.length; i++) {
    for (let j = 0; j < graph[0].length; j++) {
      const key = [i, j].join();

      if (!visited.has(key)) {
        regions.push(getRegion(key));
      }
    }
  }

  return regions.reduce((total, region) => {
    const { area, perimeter } = region;
    return total + (area * perimeter);
  }, 0);

  function getRegion(key) {
    const [startI, startJ] = key.split(',').map(Number);
    const startPlot = graph[startI][startJ];

    let perimeter = 0;
    const region = new Set;
    const queue = new Queue;

    queue.enqueue(key);

    while (queue.size()) {
      const key = queue.dequeue();

      const [i, j] = key.split(',').map(Number);
      const plot = graph[i][j];
      if (plot !== startPlot) {
        perimeter++;
        continue;
      }

      if (visited.has(key)) continue;

      visited.add(key);
      region.add(key);

      for (const dir of DIRS) {
        const nextI = i + dir[0];
        const nextJ = j + dir[1];
        const nextKey = [nextI, nextJ].join();

        if (!(nextI >= 0 && nextI < graph.length && nextJ >= 0 && nextJ < graph[0].length)) {
          perimeter++;
          continue;
        }

        queue.enqueue(nextKey);
      }
    }

    return { area: region.size, perimeter };
  }
}

console.log(solution());