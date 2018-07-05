import {
    findRecipe, findSupportedItemOrBlock, getItemAmount, getItemDisplayName,
    getItemId, getSupportedItemsAndBlocks,
    ItemStack, ShapeReduce
} from './recipes';
import {FulfillmentResponse} from './types';
import {ShapedRecipe} from './minecraft-data';
const pluralize = require('pluralize');

const toString = (itemStack: ItemStack) => {
    const singular = pluralize.singular(itemStack.displayName);
    return `${itemStack.amount} ${itemStack.amount === 1 ? singular : pluralize.plural(singular)}`
};

const speakArray = (items: ItemStack[], lastJoin: string = 'and'): string => {
    if (items.length === 1)
        return `${items.map(toString)[0]}`;
    return `${items.slice(0, items.length - 1).map(toString)} ${lastJoin} ${
        items.slice(items.length - 1).map(toString)}`;
};

const handlers = [
    {
        id: 'projects/crafting-calculator-c4a27/agent/intents/62f95706-2648-449e-b0b8-8bfe3ba14bc5',
        handler: (Item: string, Amount: number): FulfillmentResponse => {
            const recipe = findRecipe(Item) as ShapedRecipe;
            if (!recipe) {
                const found = findSupportedItemOrBlock(Item);
                if(found.length > 0)
                    return {
                        fulfillmentText: `I don't know how to craft that item but I know how to craft ${speakArray(found, 'or')},`
                    };
                return {
                    fulfillmentText: 'I don\'t know how to craft that item',
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
    }
];

export function getIntent(id: string) {
    return handlers.filter(h => h.id === id)[0].handler;
}