import * as fs from 'fs';

const WIDTH = 101;
const HEIGHT = 103;

function solution() {
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

  for (let i = 0; i < 100; i++) {
    for (let robot of robots) {
      let nextI = (robot.current.i + robot.velocity.i + HEIGHT) % HEIGHT;
      let nextJ = (robot.current.j + robot.velocity.j + WIDTH) % WIDTH;
      robot.current = { i: nextI, j: nextJ };
    }

    console.log(i+1, " seconds")
    printRobots(robots);
  }

  let quadrants = [0, 0, 0, 0];

  for (let robot of robots) {
    const { current } = robot;

    let halfWidth = (WIDTH - 1) / 2;
    let halfHeight = (HEIGHT - 1) / 2;

    if (current.i < halfHeight && current.j < halfWidth) {
      quadrants[0]++;
    } else if (current.i < halfHeight && current.j > halfWidth) {
      quadrants[1]++;
    } else if (current.i > halfHeight && current.j < halfWidth) {
      quadrants[2]++;
    } else if (current.i > halfHeight && current.j > halfWidth) {
      quadrants[3]++;
    }
  }

  return quadrants.reduce((a, b) => a * b);
}

function printRobots(robots) {
  console.log('\n');

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
}

console.log(solution());