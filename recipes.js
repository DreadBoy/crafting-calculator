"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const recipes = [
    {
        output: {
            plank: 4
        },
        input: {
            log: 1
        }
    },
    {
        output: {
            stick: 4
        },
        input: {
            plank: 2
        }
    },
    {
        output: {
            fence: 3
        },
        input: {
            stick: 2,
            plank: 4
        }
    }
];
function findRecipe(result) {
    return recipes.filter(f => Object.keys(f.output).indexOf(result) >= 0)[0];
}
function getCost(item) {
    return findRecipe(item).output;
}
exports.getCost = getCost;
//# sourceMappingURL=recipes.js.map