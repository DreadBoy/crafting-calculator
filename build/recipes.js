"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responses_1 = require("./responses");
const pluralize = require('pluralize');
const data = require('minecraft-data')('1.12.2');
function isSimpleCraftingItem(item) {
    return typeof item === 'number';
}
exports.isSimpleCraftingItem = isSimpleCraftingItem;
function isCraftingItemWithMetadata(item) {
    return Array.isArray(item);
}
exports.isCraftingItemWithMetadata = isCraftingItemWithMetadata;
function isFullCraftingItem(item) {
    return typeof item === 'object';
}
exports.isFullCraftingItem = isFullCraftingItem;
function getItemAmount(item) {
    if (isSimpleCraftingItem(item))
        return 1;
    if (isCraftingItemWithMetadata(item))
        return 1;
    if (isFullCraftingItem(item))
        return item.count;
    return 0;
}
exports.getItemAmount = getItemAmount;
function getItemId(item) {
    if (!item)
        return -1;
    if (isSimpleCraftingItem(item))
        return item;
    if (isCraftingItemWithMetadata(item))
        return item[0];
    if (isFullCraftingItem(item))
        return item.id;
    return 0;
}
exports.getItemId = getItemId;
function getItemDisplayName(id) {
    const block = Object.values(data.blocks).filter(b => b.id === id)[0];
    const item = Object.values(data.items).filter(i => i.id === id)[0];
    return block ? block.displayName : item ? item.displayName : 'unknown item';
}
exports.getItemDisplayName = getItemDisplayName;
function normalize(Item) {
    return pluralize.singular(Item.replace(/ ?\(.*?\) ?/, '')).toLowerCase();
}
exports.normalize = normalize;
function findRecipe(Item) {
    return findRecipes(Item)[0] || null;
}
exports.findRecipe = findRecipe;
function findRecipes(Item) {
    Item = normalize(Item);
    const block = Object.values(data.blocks).filter(b => normalize(b.displayName) === Item)[0];
    const item = Object.values(data.items).filter(i => normalize(i.displayName) === Item)[0];
    if (!block && !item)
        return [];
    const id = block ? block.id : item ? item.id : -1;
    const recipe = Object.keys(data.recipes).filter(i => parseInt(i) === id).map(id => data.recipes[parseInt(id)])[0];
    if (!recipe)
        return [];
    return recipe;
}
exports.findRecipes = findRecipes;
function findRecipeRecursive(Item, From) {
    Item = normalize(Item);
    From = normalize(From);
    return findRecipe(Item);
    // const toCheck: ShapedOrShapelessRecipe[] = [];
    // const checked: ShapedOrShapelessRecipe[] = [];
    // toCheck.push(...findRecipes(Item));
    // while(toCheck.length > 0){
    //     const checking = toCheck.shift();
    //     summarizeInputs(checking, 1);
    // }
}
exports.findRecipeRecursive = findRecipeRecursive;
function getAllItemsAndBlocks() {
    const blocks = Object.values(data.blocks).map(b => ({
        amount: 1,
        displayName: b.displayName,
        id: b.id,
    }));
    const items = Object.values(data.items).map(i => ({
        amount: 1,
        displayName: i.displayName,
        id: i.id,
    }));
    return blocks.concat(...items);
}
exports.getAllItemsAndBlocks = getAllItemsAndBlocks;
function getSupportedItemsAndBlocks() {
    const all = getAllItemsAndBlocks();
    return Object.keys(data.recipes).map(id => all.filter(is => is.id == parseInt(id))[0]);
}
exports.getSupportedItemsAndBlocks = getSupportedItemsAndBlocks;
function findSupportedItemOrBlock(query) {
    query = normalize(query);
    return getSupportedItemsAndBlocks().filter(is => normalize(is.displayName).includes(query));
}
exports.findSupportedItemOrBlock = findSupportedItemOrBlock;
function isShaped(recipe) {
    return !!recipe.inShape;
}
exports.isShaped = isShaped;
function isShapeless(recipe) {
    return !!recipe.ingredients;
}
exports.isShapeless = isShapeless;
function checkRecipe(Item, recipe) {
    if (!recipe) {
        const found = findSupportedItemOrBlock(Item);
        if (found.length > 0)
            return responses_1.FoundSimilarRecipe(Item);
        return responses_1.NoRecipeFound(Item);
    }
    if (!isShaped(recipe) && !isShapeless(recipe))
        return responses_1.NoRecipeFound(Item);
    return null;
}
exports.checkRecipe = checkRecipe;
function summarizeInputs(recipe, craftTimes) {
    const reduced = {};
    if (isShaped(recipe)) {
        for (let row of recipe.inShape)
            for (let item of row) {
                const id = getItemId(item);
                if (id < 0)
                    continue;
                if (!reduced[id])
                    reduced[id] = 0;
                reduced[id]++;
            }
    }
    else {
        for (let ingredient of recipe.ingredients) {
            const id = getItemId(ingredient);
            if (id < 0)
                continue;
            if (!reduced[id])
                reduced[id] = 0;
            reduced[id]++;
        }
    }
    return Object.keys(reduced).map(id => ({
        id: parseInt(id),
        displayName: getItemDisplayName(parseInt(id)),
        amount: reduced[parseInt(id)] * craftTimes,
    }));
}
exports.summarizeInputs = summarizeInputs;
//# sourceMappingURL=recipes.js.map