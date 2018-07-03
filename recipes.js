"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const recipes = [
    {
        output: [
            {
                item: 'plank',
                amount: 4
            }
        ],
        input: [
            {
                item: 'log',
                amount: 1
            }
        ]
    },
    {
        output: [
            {
                item: 'stick',
                amount: 4
            }
        ],
        input: [
            {
                item: 'plank',
                amount: 2
            }
        ]
    },
    {
        output: [
            {
                item: 'fence',
                amount: 3
            }
        ],
        input: [
            {
                item: 'stick',
                amount: 2
            },
            {
                item: 'plank',
                amount: 4
            }
        ]
    }
];
function findRecipe(item) {
    return recipes.filter(f => f.output.map(is => is.item).includes(item))[0];
}
exports.findRecipe = findRecipe;
//# sourceMappingURL=recipes.js.map