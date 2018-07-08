"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pluralize = require('pluralize');
exports.toStringWithAmount = (itemStack) => {
    const singular = pluralize.singular(itemStack.displayName);
    return `${itemStack.amount} ${itemStack.amount === 1 ? singular : pluralize.plural(singular)}`;
};
exports.toStringSimple = (itemStack) => {
    const singular = pluralize.singular(itemStack.displayName);
    return itemStack.amount === 1 ? singular : pluralize.plural(singular);
};
exports.speakArray = (items, toString = exports.toStringWithAmount, lastJoin = 'and') => {
    if (items.length === 1)
        return `${items.map(toString)[0]}`;
    return `${items.slice(0, items.length - 1).map(toString).join(', ')} ${lastJoin} ${items.slice(items.length - 1).map(toString)[0]}`;
};
function TellRecipe(inputs, outputs) {
    return {
        fulfillmentText: `You need ${exports.speakArray(inputs)} and you'll get ${exports.speakArray(outputs)}.`,
    };
}
exports.TellRecipe = TellRecipe;
function NoItemGiven() {
    return {
        fulfillmentText: `I don't recognise that item. You can try searching for item by saying "Do you know fence?".`
    };
}
exports.NoItemGiven = NoItemGiven;
function FoundSimilarRecipe(Item) {
    return {
        fulfillmentText: `I don't know how to craft ${Item} but you can try searching for something similar by saying "Do you know ${Item}?".`
    };
}
exports.FoundSimilarRecipe = FoundSimilarRecipe;
function NoRecipeFound(Item) {
    return {
        fulfillmentText: `I don't know how to craft ${Item}, sorry. Try searching for another item by saying "Do you know fence?".`,
    };
}
exports.NoRecipeFound = NoRecipeFound;
//# sourceMappingURL=responses.js.map