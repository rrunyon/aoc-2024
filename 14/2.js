import * as fs from 'fs';

const WIDTH = 101;
const HEIGHT = 103;

async function solution() {
  const input = fs.readFileSync('./14/input.txt', { encoding: 'utf8', flag: 'r' }).split('\n')
  let robots = [];

  for (let row of input) {
    let [p, v] = row.split(' ');

    let [startJ, startI] = p.split('=')[1].split(',').map(Number)
    let [velocityJ, velocityI] = v.split('=')[1].split(',').map(Number)

    robots.push({
      start: { i: startI, j: startJ },
      velocity: { i: velocityI, j: velocityJ},
    });
  }

  for (let robot of robots) {
    robot.current = robot.start;
  }

  let arrangements = new Map;

  for (let i = 0; i < 100000; i++) {
    for (let robot of robots) {
      let nextI = (robot.current.i + robot.velocity.i + HEIGHT) % HEIGHT;
      let nextJ = (robot.current.j + robot.velocity.j + WIDTH) % WIDTH;
      robot.current = { i: nextI, j: nextJ };
    }

    let arrangement = robots
      .map(robot => [robot.current.i, robot.current.j])
      .sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);
    let key = JSON.stringify(arrangement);
    arrangements.set(key, (arrangements.get(key) ?? 0) + 1);

    // console.log(i+1, " seconds")
    // printRobots(robots);
  }

  arrangements = Array.from(arrangements).sort((a, b) => a[1] - b[1]);
  for (let i = 0; i < 100; i++){
    printArrangement(arrangements[i]);
  }
}

function printArrangement(arrangement) {
  let robotPositions = new Map;
  let positions = JSON.parse(arrangement[0]);
  for (let position of positions) {
    let key = position.join();
    robotPositions.set(key, (robotPositions.get(key) ?? 0) + 1);
  }

  for (let i = 0; i < HEIGHT; i++) {
    let row = [];
    for (let j = 0; j < WIDTH; j++) {
      let key = [i, j].join();

      let cell = robotPositions.get(key) ?? '.';
      row.push(cell);
    }

    console.log(row.join(''));
  }

  console.log('\n');
}

function printRobots(robots) {
  let robotPositions = new Map;
  for (let robot of robots) {
    let key = [robot.current.i, robot.current.j].join();
    robotPositions.set(key, (robotPositions.get(key) ?? 0) + 1);
  }

  for (let i = 0; i < HEIGHT; i++) {
    let row = [];
    for (let j = 0; j < WIDTH; j++) {
      let key = [i, j].join();

      let cell = robotPositions.get(key) ?? '.';
      row.push(cell);
    }

    console.log(row.join(''));
  }

  console.log('\n');
}

console.log(solution());