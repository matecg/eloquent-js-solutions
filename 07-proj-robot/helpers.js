// Our graph edges
export const ROADS = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];
export const STARTING_PLACE = "Post Office";
export const VILLAGE_ROUTE = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
];

/**
 * Builds a graph from a set of edges.
 * @param {string[]} edges - Each string has a to and from separated by an '-'
 * @returns {{string:string[]}}
 */
export function buildGraph(edges) {
    function addEdge(from, to) {
        if (from in graph) graph[from].push(to);
        else graph[from] = [to]
    }
    
    const graph = Object.create({});
    for (const [from, to] of edges.map(edge => edge.split('-'))) {
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph;
}

/**
 * Randomly selects an element from the array.  
 * @param {any[]} array - An array of anything
 * @returns {any}
 */
export function getRandomElement(array) {
    const choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

/**
 * Runs a robot function logic in a loop until all parcels have been delivered.
 * It returns the total number of steps used by the robot to complete the task.
 * @param {VillageState} state - Current village state
 * @param {(state: VillageState, memory: string[]) => {direction: string, memory: string[]}} runRobot - A function that executes the robots algorithm
 * @param {string[]} memory - Memory of places the robot already visited
 * @returns {number}
 */
export function deliverParcels(state, runRobot, memory) {
    for (let step = 0 ;; step++) {
        if (!state.parcels.length) {
            return step;
        }
        
        const action = runRobot(state, memory);
        state = state.move(action.direction)
        memory = action.memory;
        console.log(`Moved to ${action.direction}`)
    }
}

/**
 * Searches a graph for a route connecting origin to destination.
 * Assumes the graphs does not have isolated vertices.
 * @param {{string: string[]}} graph - A graph containing all village routes.
 * @param {string} from - Origin point
 * @param {string} to - Destination point
 * @returns {string[]}
 */
export function findRoute(graph, from, to) {
    let work = [{at: from, route: []}]
    for(let i = 0; i < work.length; i++) {
        let {at, route} = work[i];
        for (const place of graph[at]) {
            if (to == place) return route.concat(place);
            if (!work.some(el => el.at == place)) {
                work.push({at: place, route: route.concat(place)})
            }
        }
    }
}
