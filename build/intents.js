"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const recipes_1 = require("./recipes");
const pluralize = require('pluralize');
const toStringWithAmount = (itemStack) => {
    const singular = pluralize.singular(itemStack.displayName);
    return `${itemStack.amount} ${itemStack.amount === 1 ? singular : pluralize.plural(singular)}`;
};
const toStringSimple = (itemStack) => {
    const singular = pluralize.singular(itemStack.displayName);
    return itemStack.amount === 1 ? singular : pluralize.plural(singular);
};
const speakArray = (items, toString = toStringWithAmount, lastJoin = 'and') => {
    if (items.length === 1)
        return `${items.map(toString)[0]}`;
    return `${items.slice(0, items.length - 1).map(toString).join(', ')} ${lastJoin} ${items.slice(items.length - 1).map(toString)[0]}`;
};
const handlers = [
    {
        id: 'projects/crafting-calculator-c4a27/agent/intents/62f95706-2648-449e-b0b8-8bfe3ba14bc5',
        handler: (parameters) => {
            const Item = parameters['Item'];
            const Amount = parameters['Amount'];
            if (Item.length === 0)
                return {
                    fulfillmentText: `I don't recognise that item. You can try searching for item by saying "Do you know fence?".`
                };
            const recipe = recipes_1.findRecipe(Item);
            if (!recipe) {
                const found = recipes_1.findSupportedItemOrBlock(Item);
                if (found.length > 0)
                    return {
                        fulfillmentText: `I don't know how to craft ${Item} but you can try searching for something similar by saying "Do you know ${Item}?".`
                    };
                return {
                    fulfillmentText: `I don't know how to craft ${Item}, sorry. Try searching for another item by saying "Do you know fence?".`,
                };
            }
            if (!recipes_1.isShaped(recipe) && !recipes_1.isShapeless(recipe))
                return {
                    fulfillmentText: `I don't know how to craft ${Item}, sorry. Try searching for another item by saying "Do you know fence?".`,
                };
            let outputPerOneCraft = recipes_1.getItemAmount(recipe.result);
            const craftTimes = Math.ceil(Amount / outputPerOneCraft);
            let outputs = [{
                    id: recipes_1.getItemId(recipe.result),
                    displayName: recipes_1.getItemDisplayName(recipes_1.getItemId(recipe.result)),
                    amount: recipes_1.getItemAmount(recipe.result) * craftTimes,
                }];
            const reduced = {};
            if (recipes_1.isShaped(recipe)) {
                for (let row of recipe.inShape)
                    for (let item of row) {
                        const id = recipes_1.getItemId(item);
                        if (id < 0)
                            continue;
                        if (!reduced[id])
                            reduced[id] = 0;
                        reduced[id]++;
                    }
            }
            else {
                for (let ingredient of recipe.ingredients) {
                    const id = recipes_1.getItemId(ingredient);
                    if (id < 0)
                        continue;
                    if (!reduced[id])
                        reduced[id] = 0;
                    reduced[id]++;
                }
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
    },
    {
        id: 'projects/crafting-calculator-c4a27/agent/intents/266a2728-0035-4e7b-9b61-ed4fbe09f801',
        handler: (parameters) => {
            const Item = parameters['Item'];
            if (Item.length === 0)
                return {
                    fulfillmentText: `I don't recognise ${Item}, sorry.`
                };
            const found = recipes_1.findSupportedItemOrBlock(Item);
            if (found.length > 0)
                return {
                    fulfillmentText: `I know how to craft ${speakArray(found, toStringSimple)}.`
                };
            return {
                fulfillmentText: `I don't how to craft ${Item}, sorry.`
            };
        }
    }
];
function getIntent(id) {
    return handlers.filter(h => h.id === id)[0].handler;
}
exports.getIntent = getIntent;
//# sourceMappingURL=intents.js.map