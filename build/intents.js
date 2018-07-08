"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const recipes_1 = require("./recipes");
const responses_1 = require("./responses");
const handlers = [
    {
        id: 'projects/crafting-calculator-c4a27/agent/intents/62f95706-2648-449e-b0b8-8bfe3ba14bc5',
        handler: (parameters) => {
            const Item = parameters['Item'];
            const Amount = parameters['Amount'];
            if (Item.length === 0)
                return responses_1.NoItemGiven();
            const recipe = recipes_1.findRecipe(Item);
            const invalid = recipes_1.checkRecipe(Item, recipe);
            if (invalid)
                return invalid;
            let outputPerOneCraft = recipes_1.getItemAmount(recipe.result);
            const craftTimes = Math.ceil(Amount / outputPerOneCraft);
            let outputs = [{
                    id: recipes_1.getItemId(recipe.result),
                    displayName: recipes_1.getItemDisplayName(recipes_1.getItemId(recipe.result)),
                    amount: recipes_1.getItemAmount(recipe.result) * craftTimes,
                }];
            const inputs = recipes_1.summarizeInputs(recipe, craftTimes);
            return responses_1.TellRecipe(inputs, outputs);
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
                    fulfillmentText: `I know how to craft ${responses_1.speakArray(found, responses_1.toStringSimple)}.`
                };
            return {
                fulfillmentText: `I don't how to craft ${Item}, sorry.`
            };
        }
    },
    {
        id: 'projects/crafting-calculator-c4a27/agent/intents/7af9a201-5460-4079-aedc-6878c374b363',
        handler: (parameters) => {
            const Item = parameters['Item'];
            const From = parameters['From'];
            const Amount = parameters['Amount'];
            if (Item.length === 0 || From.length === 0)
                return responses_1.NoItemGiven();
            const recipe = recipes_1.findRecipeRecursive(Item, From);
            const invalid = recipes_1.checkRecipe(Item, recipe);
            if (invalid)
                return invalid;
            let outputPerOneCraft = recipes_1.getItemAmount(recipe.result);
            const craftTimes = Math.ceil(Amount / outputPerOneCraft);
            let outputs = [{
                    id: recipes_1.getItemId(recipe.result),
                    displayName: recipes_1.getItemDisplayName(recipes_1.getItemId(recipe.result)),
                    amount: recipes_1.getItemAmount(recipe.result) * craftTimes,
                }];
            const inputs = recipes_1.summarizeInputs(recipe, craftTimes);
            return responses_1.TellRecipe(inputs, outputs);
        }
    }
];
function getIntent(id) {
    const intent = handlers.filter(h => h.id === id)[0];
    if (!intent)
        return () => ({
            fulfillmentText: `I didn't understand your question, can you repeat it, please?`
        });
    return intent.handler;
}
exports.getIntent = getIntent;
//# sourceMappingURL=intents.js.map