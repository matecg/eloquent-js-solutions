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