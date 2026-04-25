/**
 * Solution(s) to Chapter 07 - Problem 2: Robot Efficiency.
*/

import { buildGraph, deliverParcels, findRoute, ROADS } from "../helpers.js";
import { goalOrientedRobot } from "../robots.js";
import VillageState from "../village-state.js";
import { compareRobots } from "./01.js";

/**
 * 
 * @param {import("../village-state.js").default} state - A VillageState instance
 * @param {string[]} memory - The route to the parcel and from a parcel.
 */
function proximityRobot(state, memory) {
    if (memory.length === 0) {
        let closestDistance = Number.POSITIVE_INFINITY;
        for (const parcel of state.parcels) {
            let route;
            if (state.place !== parcel.place) {
                route = findRoute(state.village, state.place, parcel.place);
            } else {
                route = findRoute(state.village, state.place, parcel.address);
            }
            if (route.length < closestDistance) {
                closestDistance = route.length;
                memory = route;
            }
        }
    }
    return { direction: memory[0], memory: memory.slice(1) }
}

const village = buildGraph(ROADS);
const goalSteps = deliverParcels(
    VillageState.createRandom(village), 
    goalOrientedRobot, 
    []
);
const proximitySteps = deliverParcels(
    VillageState.createRandom(village),
    proximityRobot,
    []
);
console.log(`Goal Oriented Steps: ${goalSteps}.`);
console.log(`Proximity Oriented Steps: ${proximitySteps}.`);