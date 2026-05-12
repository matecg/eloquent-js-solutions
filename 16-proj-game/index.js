import Level from "./engine/level.js";

const simpleLevelPlan = `
......................
..#................#..
..#..............=.#..
..#.........o.o....#..
..#.@......#####...#..
..#####............#..
......#++++++++++++#..
......##############..
......................`;

const levelOne = new Level(simpleLevelPlan);
console.log(levelOne);