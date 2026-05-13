import Level from "./engine/level.js";
import State from "./engine/state.js";
import DOMDisplay from "./gui/dom-display.js";

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
let display = new DOMDisplay(document.body, levelOne);
display.syncState(State.start(levelOne));