import {
    checkRecipe,
    findRecipe,
    findRecipeRecursive,
    findSupportedItemOrBlock,
    getItemAmount,
    getItemDisplayName,
    getItemId,
    summarizeInputs
} from './recipes';
import {FulfillmentResponse, ItemStack, Parameters} from './types';
import {ShapedOrShapelessRecipe} from './minecraft-data';
import {NoItemGiven, speakArray, TellRecipe, toStringSimple} from "./responses";

const handlers = [
    {
        id: 'projects/crafting-calculator-c4a27/agent/intents/62f95706-2648-449e-b0b8-8bfe3ba14bc5',
        handler: (parameters: Parameters): FulfillmentResponse => {
            const Item: string = parameters['Item'];
            const Amount: number = parameters['Amount'];
            if (Item.length === 0)
                return NoItemGiven();
            const recipe = findRecipe(Item) as ShapedOrShapelessRecipe;
            const invalid = checkRecipe(Item, recipe);
            if (invalid)
                return invalid;

            let outputPerOneCraft = getItemAmount(recipe.result);
            const craftTimes = Math.ceil(Amount / outputPerOneCraft);
            let outputs: ItemStack[] = [{
                id: getItemId(recipe.result),
                displayName: getItemDisplayName(getItemId(recipe.result)),
                amount: getItemAmount(recipe.result) * craftTimes,
            }];

            const inputs = summarizeInputs(recipe, craftTimes);
            return TellRecipe(inputs, outputs);
        }
    },
    {
        id: 'projects/crafting-calculator-c4a27/agent/intents/266a2728-0035-4e7b-9b61-ed4fbe09f801',
        handler: (parameters: Parameters) => {
            const Item: string = parameters['Item'];
            if (Item.length === 0)
                return {
                    fulfillmentText: `I don't recognise ${Item}, sorry.`
                };
            const found = findSupportedItemOrBlock(Item);
            if (found.length > 0)
                return {
                    fulfillmentText: `I know how to craft ${speakArray(found, toStringSimple)}.`
                };
            return {
                fulfillmentText: `I don't how to craft ${Item}, sorry.`
            };
        }
    },
    {
        id: 'projects/crafting-calculator-c4a27/agent/intents/7af9a201-5460-4079-aedc-6878c374b363',
        handler: (parameters: Parameters) => {
            const Item: string = parameters['Item'];
            const From: string = parameters['From'];
            const Amount: number = parameters['Amount'];
            if (Item.length === 0 || From.length === 0)
                return NoItemGiven();
            const recipe = findRecipeRecursive(Item, From) as ShapedOrShapelessRecipe;
            const invalid = checkRecipe(Item, recipe);
            if (invalid)
                return invalid;

            let outputPerOneCraft = getItemAmount(recipe.result);
            const craftTimes = Math.ceil(Amount / outputPerOneCraft);
            let outputs: ItemStack[] = [{
                id: getItemId(recipe.result),
                displayName: getItemDisplayName(getItemId(recipe.result)),
                amount: getItemAmount(recipe.result) * craftTimes,
            }];

            const inputs = summarizeInputs(recipe, craftTimes);
            return TellRecipe(inputs, outputs);
        }
    }
];

export function getIntent(id: string): (parameters: Parameters) => FulfillmentResponse {
    const intent = handlers.filter(h => h.id === id)[0];
    if (!intent)
        return () => ({
            fulfillmentText: `I didn't understand your question, can you repeat it, please?`
        });
    return intent.handler;
}