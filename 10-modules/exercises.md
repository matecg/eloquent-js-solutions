# Chapter 10 - Modules Exercises

## 1. A Modular Robot

These are the bindings that the project from Chapter 7 creates:

```js
roads
buildGraph
roadGraph
VillageState
runRobot
randomPick
randomRobot
mailRoute
routeRobot
findRoute
goalOrientedRobot
```

If you were to write that project as a modular program, what modules would you create? Which module would depend on which other module, and what would their interfaces look like?

Which pieces are likely to be available prewritten on NPM? Would you prefer to use an NPM package or write them yourself?

## 2. Roads Module

Write an ES module based on the example from Chapter 7 that contains the array of roads and exports the graph data structure representing them as `roadGraph`. It depends on a module `./graph.js` that exports a function `buildGraph`, used to build the graph. This function expects an array of two-element arrays (the start and end points of the roads).

```js
// Add dependencies and exports

const roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];
```

## 3. Circular Dependencies

A circular dependency is a situation where module A depends on B, and B also, directly or indirectly, depends on A. Many module systems simply forbid this because whichever order you choose for loading such modules, you cannot make sure that each module’s dependencies have been loaded before it runs.

CommonJS modules allow a limited form of cyclic dependencies. As long as the modules don’t access each other’s interface until after they finish loading, cyclic dependencies are okay.

The `require` function given earlier in this chapter supports this type of dependency cycle. Can you see how it handles cycles?