// USED TO TURN THIS FILE: https://raw.githubusercontent.com/any2cards/d2e/master/data/monsters.js
// INTO monsters.json
import { readFileSync, writeFileSync } from "fs";
import lodash from "lodash"; // Requires lodash
const { chain, mergeWith } = lodash;

const monsters = JSON.parse(readFileSync("./descent-monsters.json"));
let monstersGrouped = chain(monsters)
  .groupBy((monster) => monster.name + monster.act)
  .map((g) =>
    mergeWith({}, ...g, (obj, src) =>
      Array.isArray(obj) ? obj.concat(src) : undefined
    )
  )
  .value();

monstersGrouped = monstersGrouped.map((a) => {
  delete a.points;
  return a;
});

writeFileSync("./monsters.json", JSON.stringify(monstersGrouped));
