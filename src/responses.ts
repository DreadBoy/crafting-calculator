import {FulfillmentResponse, ItemStack} from "./types";

const pluralize = require('pluralize');

export const toStringWithAmount = (itemStack: ItemStack) => {
    const singular = pluralize.singular(itemStack.displayName);
    return `${itemStack.amount} ${itemStack.amount === 1 ? singular : pluralize.plural(singular)}`
};

export const toStringSimple = (itemStack: ItemStack) => {
    const singular = pluralize.singular(itemStack.displayName);
    return itemStack.amount === 1 ? singular : pluralize.plural(singular);
};

export const speakArray = (items: ItemStack[], toString: (itemStack: ItemStack) => string = toStringWithAmount, lastJoin: string = 'and'): string => {
    if (items.length === 1)
        return `${items.map(toString)[0]}`;
    return `${items.slice(0, items.length - 1).map(toString).join(', ')} ${lastJoin} ${
        items.slice(items.length - 1).map(toString)[0]}`;
};

export function TellRecipe(inputs: ItemStack[], outputs: ItemStack[]){
    return {
        fulfillmentText: `You need ${speakArray(inputs)} and you'll get ${speakArray(outputs)}.`,
    };
}

export function NoItemGiven(): FulfillmentResponse {
    return {
        fulfillmentText: `I don't recognise that item. You can try searching for item by saying "Do you know fence?".`
    };
}
export function FoundSimilarRecipe(Item: string): FulfillmentResponse {
    return {
        fulfillmentText: `I don't know how to craft ${Item} but you can try searching for something similar by saying "Do you know ${Item}?".`
    };
}
export function NoRecipeFound(Item: string): FulfillmentResponse {
    return {
        fulfillmentText: `I don't know how to craft ${Item}, sorry. Try searching for another item by saying "Do you know fence?".`,
    };
}