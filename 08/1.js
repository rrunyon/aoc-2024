import * as fs from 'fs';

function solution() {
  const input = fs.readFileSync('./08/input.txt', { encoding: 'utf8', flag: 'r' }).split('\n');

  const frequencyToLocationsMap = new Map;

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      const cell = input[i][j];
      if (cell === '.') continue;

      if (!frequencyToLocationsMap.has(cell)) frequencyToLocationsMap.set(cell, []);
      frequencyToLocationsMap.get(cell).push([i, j]);
    }
  }

  const antiNodes = new Set;

  for (const [_frequency, locations] of frequencyToLocationsMap) {
    for (let i = 0; i < locations.length; i++) {
      let location1 = locations[i];

      for (let j = 0; j < locations.length; j++) {
        if (i === j) continue;

        let location2 = locations[j];
        let xDiff = location1[1] - location2[1];
        let yDiff = location1[0] - location2[0];

        let antiNode = [location1[0] + yDiff, location1[1] + xDiff];
        if (antiNode[0] >= 0 && antiNode[0] < input.length && antiNode[1] >= 0 && antiNode[1] < input[0].length) {
          antiNodes.add(antiNode.join());
        }
      }
    }
  }

  return antiNodes.size;
}

console.log(solution());
