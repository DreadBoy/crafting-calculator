"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const recipes_1 = require("./recipes");
const pluralize = require('pluralize');
const toString = (itemStack) => {
    const singular = pluralize.singular(itemStack.displayName);
    return `${itemStack.amount} ${itemStack.amount === 1 ? singular : pluralize.plural(singular)}`;
};
const speakArray = (items, lastJoin = 'and') => {
    if (items.length === 1)
        return `${items.map(toString)[0]}`;
    return `${items.slice(0, items.length - 1).map(toString)} ${lastJoin} ${items.slice(items.length - 1).map(toString)}`;
};
const handlers = [
    {
        id: 'projects/crafting-calculator-c4a27/agent/intents/62f95706-2648-449e-b0b8-8bfe3ba14bc5',
        handler: (Item, Amount) => {
            const recipe = recipes_1.findRecipe(Item);
            if (!recipe) {
                const found = recipes_1.findSupportedItemOrBlock(Item);
                if (found.length > 0)
                    return {
                        fulfillmentText: `I don't know how to craft that item but I know how to craft ${speakArray(found, 'or')}.`
                    };
                return {
                    fulfillmentText: 'I don\'t know how to craft that item',
                };
            }
            let outputPerOneCraft = recipes_1.getItemAmount(recipe.result);
            const craftTimes = Math.ceil(Amount / outputPerOneCraft);
            let outputs = [{
                    id: recipes_1.getItemId(recipe.result),
                    displayName: recipes_1.getItemDisplayName(recipes_1.getItemId(recipe.result)),
                    amount: recipes_1.getItemAmount(recipe.result) * craftTimes,
                }];
            const reduced = {};
            for (let row of recipe.inShape)
                for (let item of row) {
                    const id = recipes_1.getItemId(item);
                    if (id < 0)
                        continue;
                    if (!reduced[id])
                        reduced[id] = 0;
                    reduced[id]++;
                }
            const inputs = Object.keys(reduced).map(id => ({
                id: parseInt(id),
                displayName: recipes_1.getItemDisplayName(parseInt(id)),
                amount: reduced[parseInt(id)] * craftTimes,
            }));
            return {
                fulfillmentText: `You need ${speakArray(inputs)} and you'll get ${speakArray(outputs)}.`,
            };
        }
    }
];
function getIntent(id) {
    return handlers.filter(h => h.id === id)[0].handler;
}
exports.getIntent = getIntent;
//# sourceMappingURL=intents.js.map