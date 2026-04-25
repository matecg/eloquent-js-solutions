/**
 * Solution(s) to Chapter 07 - Problem 1: Measuring a Robot.
*/

import { ROADS, buildGraph, deliverParcels } from "../helpers.js";
import { goalOrientedRobot, routeRobot } from "../robots.js";
import VillageState from "../village-state.js";

/**
 * Individually assign 100 tasks to each robot function and returns an
 * object containing the average of steps to complete a task for each robot.
 * @param {*} robot1 - Robot 1 function
 * @param {string[]} memory1 - Robot 1 memory
 * @param {*} robot2 - Robot 2 function
 * @param {string[]} memory2 - Robot 2 memory
 * @returns {{robot1: number, robot2: number}}
 */
export function compareRobots(robot1, memory1, robot2, memory2) {
    const testCount = 100;
    const village = buildGraph(ROADS);
    let averages = {robot1: 0, robot2: 0}
    for (let i = 0; i < testCount; i++) {
        const task = VillageState.createRandom(village, 1);
        averages.robot1 += deliverParcels(task, robot1, memory1);
        averages.robot2 += deliverParcels(task, robot2, memory2);
    }
    averages.robot1 /= testCount;
    averages.robot2 /= testCount;
    return averages;
}

const result = compareRobots(routeRobot, [], goalOrientedRobot, []);
console.log(result);