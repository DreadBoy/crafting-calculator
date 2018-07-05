import {
    findRecipe, findSupportedItemOrBlock, getItemAmount, getItemDisplayName,
    getItemId,
    ItemStack, ShapeReduce
} from './recipes';
import {FulfillmentResponse, Parameters} from './types';
import {ShapedRecipe} from './minecraft-data';
const pluralize = require('pluralize');

const toStringWithAmount = (itemStack: ItemStack) => {
    const singular = pluralize.singular(itemStack.displayName);
    return `${itemStack.amount} ${itemStack.amount === 1 ? singular : pluralize.plural(singular)}`
};

const toStringSimple = (itemStack: ItemStack) => {
    const singular = pluralize.singular(itemStack.displayName);
    return itemStack.amount === 1 ? singular : pluralize.plural(singular);
};

const speakArray = (items: ItemStack[], toString: (itemStack: ItemStack) => string = toStringWithAmount, lastJoin: string = 'and'): string => {
    if (items.length === 1)
        return `${items.map(toString)[0]}`;
    return `${items.slice(0, items.length - 1).map(toString).join(', ')} ${lastJoin} ${
        items.slice(items.length - 1).map(toString)[0]}`;
};

const handlers = [
    {
        id: 'projects/crafting-calculator-c4a27/agent/intents/62f95706-2648-449e-b0b8-8bfe3ba14bc5',
        handler: (parameters: Parameters): FulfillmentResponse => {
            const Item: string = parameters['Item'];
            const Amount: number = parameters['Amount'];
            if (Item.length === 0)
                return {
                    fulfillmentText: `I don't recognise that item. You can try searching for item by saying "Do you know fence?".`
                };
            const recipe = findRecipe(Item) as ShapedRecipe;
            if (!recipe) {
                const found = findSupportedItemOrBlock(Item);
                if(found.length > 0)
                    return {
                        fulfillmentText: `I don't know how to craft ${Item} but you can try searching for something similar by saying "Do you know ${Item}?".`
                    };
                return {
                    fulfillmentText: `I don't know how to craft ${Item}, sorry. 😕 Try searching for another item by saying "Do you know fence?".`,
                };
            }
            let outputPerOneCraft = getItemAmount(recipe.result);
            const craftTimes = Math.ceil(Amount / outputPerOneCraft);
            let outputs: ItemStack[] = [{
                id: getItemId(recipe.result),
                displayName: getItemDisplayName(getItemId(recipe.result)),
                amount: getItemAmount(recipe.result) * craftTimes,
            }];
            const reduced = {} as ShapeReduce;
            for (let row of recipe.inShape)
                for (let item of row) {
                    const id = getItemId(item);
                    if (id < 0)
                        continue;
                    if (!reduced[id])
                        reduced[id] = 0;
                    reduced[id]++;
                }
            const inputs = Object.keys(reduced).map(id => (
                {
                    id: parseInt(id),
                    displayName: getItemDisplayName(parseInt(id)),
                    amount: reduced[parseInt(id)] * craftTimes,
                } as ItemStack
            ));
            return {
                fulfillmentText: `You need ${speakArray(inputs)} and you'll get ${speakArray(outputs)}.`,
            };
        }
    },
    {
        id: 'projects/crafting-calculator-c4a27/agent/intents/266a2728-0035-4e7b-9b61-ed4fbe09f801',
        handler: (parameters: Parameters) => {
            const Item: string = parameters['Item'];
            if (Item.length === 0)
                return {
                    fulfillmentText: `I don't recognise ${Item}, sorry. 😕`
                };
            const found = findSupportedItemOrBlock(Item);
            if (found.length > 0)
                return {
                    fulfillmentText: `I know how to craft ${speakArray(found, toStringSimple)}.`
                };
            return {
                fulfillmentText: `I don't how to craft ${Item}, sorry. 😕`
            };
        }
    }
];

export function getIntent(id: string) {
    return handlers.filter(h => h.id === id)[0].handler;
}