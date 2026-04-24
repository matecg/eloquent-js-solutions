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