import * as fs from 'fs';
import { Queue } from '@datastructures-js/queue';

function solution() {
  const input = fs.readFileSync('./20/input.txt', { encoding: 'utf8', flag: 'r' }).split('\n')

  let start;
  let end;

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      let cell = input[i][j];

      if (cell === 'S') {
        start = [i, j].join();
      } else if (cell == 'E') {
        end = [i, j].join();
      }
    }
  }

  const CHEATING_STATE = {
    NOT_CHEATED: 'NOT_CHEATED',
    CHEATING: 'CHEATING',
    CHEATED: 'CHEATED',
  };

  let queue = new Queue;
  queue.enqueue({
    current: start,
    visited: new Set([start]),
    moves: 0,
    cheatingState: CHEATING_STATE.NOT_CHEATED,
    cheatStart: undefined,
    cheatEnd: undefined,
  });

  const DIRS = [[0, 1], [1, 0], [-1, 0], [0, -1]];

  let movesWithoutCheating;
  const cheatsSet = new Set;
  const cheats = new Map;

  while (queue.size()) {
    let { current, visited, moves, cheatingState, cheatStart, cheatEnd } = queue.dequeue();
    let [i, j] = current.split(',').map(Number);

    if (current === end) {
      if (cheatingState === CHEATING_STATE.NOT_CHEATED) {
        movesWithoutCheating = moves;
      } else {
        const cheatKey = [cheatStart, cheatEnd].join();
        if (!cheatsSet.has(cheatKey)) {
          cheatsSet.add(cheatKey);
          cheats.set(moves, (cheats.get(moves) ?? 0) + 1);
        }
      }

      continue;
    }

    for (let dir of DIRS) {
      let newI = i + dir[0];
      let newJ = j + dir[1];
      let next = [newI, newJ].join();
      let nextCheatStart = cheatStart;
      let nextCheatEnd = cheatEnd;
      let nextCheatingState = cheatingState;

      if (newI >= 0 && newI < input.length && newJ >= 0 && newJ < input[0].length && !visited.has(next)) {
        if (input[newI][newJ] === '#') {
          if (cheatingState === CHEATING_STATE.CHEATED) {
            continue;
          } else if (cheatingState === CHEATING_STATE.NOT_CHEATED) {
            nextCheatStart = current;
            nextCheatingState = CHEATING_STATE.CHEATED;
          }
        }

        if (cheatingState === CHEATING_STATE.CHEATED) {
          nextCheatEnd = current;
          // nextCheatingState = CHEATING_STATE.CHEATED;
        }

        let newVisited = new Set(visited);
        newVisited.add(next);
        queue.enqueue({
          current: next,
          visited: newVisited,
          moves: moves + 1,
          cheatingState: nextCheatingState,
          cheatStart: nextCheatStart,
          cheatEnd: nextCheatEnd,
        });
      }
    }
  }

  let total = 0;
  for (let [moves, count] of cheats) {
    let movesSaved = movesWithoutCheating - moves;
    if (movesSaved >= 100) {
      total += count;
    }
  }

  return count;
}

console.log(solution());