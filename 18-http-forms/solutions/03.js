/**
 * Solution(s) Chapter 18 - Problem 3: Conway's Game of Life
*/

const SIZE = 10;
createGrid(SIZE);
document.querySelector("#next").addEventListener("click", () => {
    getNextGeneration();
})

function createGrid(size) {
    const grid = document.querySelector("#grid");

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const cell = document.createElement("input");
            cell.type = "checkbox";
            cell.name = `${j + 1},${i + 1}`;
            cell.checked = Math.random() > 0.5;
            grid.appendChild(cell);
        }
    }
}

function getNextGeneration(size) {
    const next = getNextState();
    console.log(next);
    updateCells(next);
}

function getNextState() {
    const grid = document.querySelector("#grid");
    for (const cell of grid.children) {
        if (!cell.name) continue;

        const [x, y] = cell.name.split(",").map(Number);
        const neighbors = getNeighbors(x, y, grid);
        const alive = neighbors.reduce((acc, cur) => cur.checked ? acc + 1 : acc, 0);
        cell.dataset["alive"] = alive;
    }
    return grid.children;
}

function getNeighbors(x, y, grid) {
    let neighbors = [];
    for (let cellY = y - 1; cellY <= y + 1; cellY++) {
        for (let cellX = x - 1; cellX <= x + 1; cellX++) {
            if (cellX == x && cellY == y) continue;

            neighbors.push(grid.children.namedItem(`${cellX},${cellY}`));
        }
    }
    return neighbors.filter(cell => cell);
}

function updateCells(cells) {
    for (const cell of cells) {
        updateLifeStatus(cell);
    }
}

function updateLifeStatus(cell) {
    const aliveNeighbors = cell.dataset["alive"];
    if (aliveNeighbors === undefined) return;
    if (cell.checked) {
        if (aliveNeighbors > 3 || aliveNeighbors < 2) {
            cell.checked = false;
        }
    } else {
        if (aliveNeighbors == 3) cell.checked = true;
    }
}