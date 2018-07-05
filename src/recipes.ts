import {
    Block, CraftingItem,
    CraftingItemId,
    CraftingItemMetadata,
    data,
    Item,
    RecipeItem,
    ShapedOrShapelessRecipe,
} from './minecraft-data';
import {ItemStack} from './types';
const pluralize = require('pluralize');


const data = require('minecraft-data')('1.12.2') as data;

export function isSimpleCraftingItem(item: RecipeItem): item is CraftingItemId {
    return typeof item === 'number'
}

export function isCraftingItemWithMetadata(item: RecipeItem): item is [CraftingItemId, CraftingItemMetadata] {
    return Array.isArray(item);
}

export function isFullCraftingItem(item: RecipeItem): item is CraftingItem {
    return typeof item === 'object';
}

export function getItemAmount(item: RecipeItem): number {
    if (isSimpleCraftingItem(item))
        return 1;
    if (isCraftingItemWithMetadata(item))
        return 1;
    if (isFullCraftingItem(item))
        return item.count;
    return 0;
}

export function getItemId(item: RecipeItem): number {
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

export function getItemDisplayName(id: number): string {
    const block = Object.values(data.blocks).filter(b => b.id === id)[0];
    const item = Object.values(data.items).filter(i => i.id === id)[0];
    return block ? block.displayName : item ? item.displayName : 'unknown item';
}

export function normalize(Item: string) {
    return pluralize.singular(Item.replace(/ ?\(.*?\) ?/, '')).toLowerCase();
}

export function findRecipe(Item: string): ShapedOrShapelessRecipe | null {
    Item = normalize(Item);
    const block: Block = Object.values(data.blocks).filter(b => normalize(b.displayName) === Item)[0];
    const item: Item = Object.values(data.items).filter(i => normalize(i.displayName) === Item)[0];
    if (!block && !item)
        return null;
    const id = block ? block.id : item ? item.id : -1;
    const recipe = Object.keys(data.recipes).filter(i => parseInt(i) === id).map(id => data.recipes[parseInt(id)])[0];
    if (!recipe)
        return null;
    return recipe[0];
}

export function getAllItemsAndBlocks(): ItemStack[] {
    const blocks = Object.values(data.blocks).map(b => ({
        amount: 1,
        displayName: b.displayName,
        id: b.id,
    } as ItemStack));
    const items = Object.values(data.items).map(i => ({
        amount: 1,
        displayName: i.displayName,
        id: i.id,
    } as ItemStack));
    return blocks.concat(...items);
}

export function getSupportedItemsAndBlocks() {
    const all = getAllItemsAndBlocks();
    return Object.keys(data.recipes).map(id => all.filter(is => is.id == parseInt(id))[0]);
}

export function findSupportedItemOrBlock(query: string) {
    query = normalize(query);
    return getSupportedItemsAndBlocks().filter(is => normalize(is.displayName).includes(query));
}