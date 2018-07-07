"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    Item = normalize(Item);
    const block = Object.values(data.blocks).filter(b => normalize(b.displayName) === Item)[0];
    const item = Object.values(data.items).filter(i => normalize(i.displayName) === Item)[0];
    if (!block && !item)
        return null;
    const id = block ? block.id : item ? item.id : -1;
    const recipe = Object.keys(data.recipes).filter(i => parseInt(i) === id).map(id => data.recipes[parseInt(id)])[0];
    if (!recipe)
        return null;
    return recipe[0];
}
exports.findRecipe = findRecipe;
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
//# sourceMappingURL=recipes.js.map