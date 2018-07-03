"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const recipes_1 = require("./recipes");
const toString = (itemStack) => {
    return `${itemStack.amount} ${itemStack.amount === 1 ? itemStack.item : `${itemStack.item}s`}`;
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
            if (!recipe)
                return {
                    fulfillmentText: 'I don\'t know how to make that item',
                };
            const outputPerOneCraft = recipe.output.filter(is => is.item === Item)[0].amount;
            const craftTimes = Math.ceil(Amount / outputPerOneCraft);
            const inputs = recipe.input.map((is) => ({ item: is.item, amount: is.amount * craftTimes }));
            const outputs = recipe.output.map((is) => ({ item: is.item, amount: is.amount * craftTimes }));
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