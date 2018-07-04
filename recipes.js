"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
function findRecipe(Item) {
    const block = Object.values(data.blocks).filter(b => b.displayName.toLowerCase() === Item)[0];
    const item = Object.values(data.items).filter(i => i.displayName.toLowerCase() === Item)[0];
    if (!block && !item)
        return null;
    const id = block ? block.id : item ? item.id : -1;
    const recipe = Object.keys(data.recipes).filter(i => parseInt(i) === id).map(id => data.recipes[parseInt(id)])[0];
    if (!recipe)
        return null;
    return recipe[0];
}
exports.findRecipe = findRecipe;
//# sourceMappingURL=recipes.js.map