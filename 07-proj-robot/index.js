/**
 * Chapter 7 - Project: A Robot.
 */

import VillageState from "./village-state.js";
import { buildGraph, getRandomElement, deliverParcels, ROADS } from "./helpers.js";
import { randomRobot, routeRobot, goalOrientedRobot } from "./robots.js";


const roadGraph = buildGraph(ROADS);

console.log("Testing the Random Robot:");
deliverParcels(VillageState.createRandom(roadGraph), randomRobot);
console.log();
console.log("Testing the Route Robot:");
deliverParcels(VillageState.createRandom(roadGraph), routeRobot, []);
console.log();
console.log("Testing the Goal Oriented Robot:");
deliverParcels(VillageState.createRandom(roadGraph), goalOrientedRobot, []);