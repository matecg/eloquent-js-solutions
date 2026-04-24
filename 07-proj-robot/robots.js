import { findRoute, getRandomElement, VILLAGE_ROUTE } from "./helpers.js";

/**
 * Randomly traverse the village delivering packages in a complete random order.
 * @param {import("./village-state.js").default} state - A village state instance
 * @param {{direction: string, memory: string[]}} memory - Current memory of places to visited
 * @returns {{direction: string, memory: string[]}}
 */
export function randomRobot(state, memory) {
    const randDirection = getRandomElement(state.village[state.place]);
    return {direction: randDirection}
}

/**
 * Traverse the village based on a hardcoded, predefined route twice.
 * @param {import("./village-state.js").default} state - A village state instance
 * @param {{direction: string, memory: string[]}} memory - Current memory of places to visited
 * @returns {{direction: string, memory: string[]}}
 */
export function routeRobot(state, memory) {
    if (memory.length === 0) {
        memory = VILLAGE_ROUTE
    }
    return {direction: memory[0], memory: memory.slice(1)}
}

/**
 * Calculates for each parcel a path to collect and them deliver it.
 * @param {import("./village-state.js").default} state - A VillageState instance
 * @param {string[]} memory - The route to the a parcel and from a parcel to its address
 * @returns {{direction: string, memory: string[]}}
 */
export function goalOrientedRobot(state, memory) {
    if (memory.length === 0) {
        const nextParcel = state.parcels[0];
        if (state.place !== nextParcel.place) {
            memory = findRoute(state.village, state.place, nextParcel.place);
        } else {
            memory = findRoute(state.village, state.place, nextParcel.address);
        }
    }
    return {direction: memory[0], memory: memory.slice(1)};
}