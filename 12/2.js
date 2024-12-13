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
    let outside = true;
    let sides = 0;

    // Left to right
    for (let i = -1; i <= graph.length; i++) {
      for (let j = -1; j <= graph[0].length; j++) {
        let key = [i, j].join();
        if (region.has(key) && outside) {
          let topKey = [i - 1, j].join();
          let bottomKey = [i + 1, j].join();
          if (!region.has(topKey)) sides++;
          if (!region.has(bottomKey)) sides++;
          outside = false;
        } else if (!region.has(key) && !outside) {
          let topKey = [i - 1, j - 1].join();
          let bottomKey = [i + 1, j - 1].join();
          if (!region.has(topKey)) sides++;
          if (!region.has(bottomKey)) sides++;
          outside = true;
        }
      }
    }

    outside = true;
    // Top to bottom
    for (let j = -1; j <= graph[0].length; j++) {
      for (let i = -1; i <= graph.length; i++) {
        let key = [i, j].join();

        if (region.has(key) && outside) {
          let leftKey = [i, j - 1].join();
          let rightKey = [i, j + 1].join();
          if (!region.has(leftKey)) sides++;
          if (!region.has(rightKey)) sides++;
          outside = false;
        } else if (!region.has(key) && !outside) {
          let leftKey = [i - 1, j - 1].join();
          let rightKey = [i - 1, j + 1].join();
          if (!region.has(leftKey)) sides++;
          if (!region.has(rightKey)) sides++;
          outside = true;
        }
      }
    }

    return sides;
  }
}

console.log(solution());