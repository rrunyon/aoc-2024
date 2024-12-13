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
    const { area, sides } = region;
    return total + (area * sides);
  }, 0);

  function getRegion(key) {
    const [startI, startJ] = key.split(',').map(Number);
    const startPlot = graph[startI][startJ];

    const region = new Set;
    const queue = new Queue;

    queue.enqueue(key);

    while (queue.size()) {
      const key = queue.dequeue();

      const [i, j] = key.split(',').map(Number);
      const plot = graph[i][j];
      if (plot !== startPlot) {
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
          continue;
        }

        queue.enqueue(nextKey);
      }
    }

    return { area: region.size, sides: countSides(region) };
  }

  function countSides(region) {
    let sides = 0;

    for (let plot of region) {
      let [i, j] = plot.split(',').map(Number);
      const [right, down, up, left, bottomRight, bottomLeft, topRight, topLeft] = [...DIRS, [1, 1], [1, -1], [-1, 1], [-1, -1]].map(dir => [i + dir[0], j + dir[1]].join());

      if (!region.has(up) && !region.has(left)) sides++;
      if (!region.has(up) && !region.has(right)) sides++;
      if (!region.has(down) && !region.has(left)) sides++;
      if (!region.has(down) && !region.has(right)) sides++;

      if (region.has(down) && region.has(bottomRight) && !region.has(right)) sides++;
      if (region.has(down) && region.has(bottomLeft) && !region.has(left)) sides++;

      if (region.has(up) && region.has(topRight) && !region.has(right)) sides++;
      if (region.has(up) && region.has(topLeft) && !region.has(left)) sides++;
    }

    return sides;
  }
}

console.log(solution());