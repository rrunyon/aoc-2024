import * as fs from 'fs';

function solution() {
  let input = fs.readFileSync('./05/input.txt', { encoding: 'utf8', flag: 'r' }).split('\n');

  let orderingGraph = new Map;

  let rules = [];
  let updates = [];

  let readingRules = true;
  for (let line of input) {
    if (!line) {
      readingRules = false;
      continue;
    }

    if (readingRules) {
      rules.push(line);
    } else {
      updates.push(line);
    }
  }

  for (let rule of rules) {
    if (!rule) break;

    let [before, after] = rule.split('|');

    if (!orderingGraph.has(before)) {
      orderingGraph.set(before, new Map);
      orderingGraph.get(before).set('before', new Set);
      orderingGraph.get(before).set('after', new Set);
    }

    if (!orderingGraph.has(after)) {
      orderingGraph.set(after, new Map);
      orderingGraph.get(after).set('before', new Set);
      orderingGraph.get(after).set('after', new Set);
    }

    orderingGraph.get(before).get('after').add(after);
    orderingGraph.get(after).get('before').add(before);
  }

  let result = 0;
  for (let update of updates) {
    result += validateOrder(update, orderingGraph);
  }

  return result;
}

function validateOrder(update, orderingGraph) {
    let pages = update.split(',');

    for (let i = 0; i < pages.length - 1; i++) {
      let current = pages[i];
      let next = pages[i+1];

      if (!orderingGraph.get(current).get('after').has(next)) return 0;
    }

    return Number(pages[Math.floor(pages.length / 2)]);
}

console.log(solution());
