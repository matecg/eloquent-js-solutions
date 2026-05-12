import Vec from "./vec.js";

/**
 * Class responsible for building game levels.
 */
export default class Level {
    /**
     * @param {string} plan - A level plan string
     */
    constructor(plan) {
        const clearedPlan = plan.trim().split("\n").map(line => [...line]);

        this.height = clearedPlan.length;
        this.width = clearedPlan[0].length;
        this.startActors = [];
        this.rows = clearedPlan.map((row, y) => {
            return row.map((char, x) => {
                let type = levelCharacters[char];
                if (typeof type !== "string") {
                    const pos = new Vec(x, y);
                    this.startActors.push(type.create(pos, char));
                    type = "empty";
                }
                return type;
            })
        });
    }
}

const levelCharacters = {};