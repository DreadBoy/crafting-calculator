"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const recipes_1 = require("./recipes");
const speakArray = (pairs, lastJoin = 'and') => {
    const toString = (pair) => `${pair.amount} ${pair.item}`;
    return `${pairs.slice(0, pairs.length - 1).map(toString).join(', ')} ${lastJoin} ${pairs.slice(pairs.length - 1).map(toString)}`;
};
const handlers = [
    {
        id: 'projects/crafting-calculator-c4a27/agent/intents/62f95706-2648-449e-b0b8-8bfe3ba14bc5',
        handler: (Item, Amount) => {
            const cost = recipes_1.getCost(Item);
            const ret = Object.keys(cost).map(key => ({ item: key, amount: cost[key] * Amount }));
            if (ret.reduce((acc, curr) => acc + curr.amount, 0) === 0)
                return {
                    fulfillmentText: 'I don\'t know how to make that item',
                };
            return {
                fulfillmentText: `You need ${speakArray(ret)}`,
            };
        }
    }
];
function getIntent(id) {
    return handlers.filter(h => h.id === id)[0].handler;
}
exports.getIntent = getIntent;
//# sourceMappingURL=intents.js.map