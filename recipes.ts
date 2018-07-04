import {
    Block, CraftingItem,
    CraftingItemId,
    CraftingItemMetadata,
    data,
    Item,
    RecipeItem,
    ShapedOrShapelessRecipe,
} from './minecraft-data';

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

export type ShapeReduce = { [id: number]: number };

export type ItemStack = {
    id: number
    displayName: string
    amount: number
}

export function findRecipe(Item: string): ShapedOrShapelessRecipe | null {
    const block: Block = Object.values(data.blocks).filter(b => b.displayName.toLowerCase() === Item)[0];
    const item: Item = Object.values(data.items).filter(i => i.displayName.toLowerCase() === Item)[0];
    if (!block && !item)
        return null;
    const id = block ? block.id : item ? item.id : -1;
    const recipe = Object.keys(data.recipes).filter(i => parseInt(i) === id).map(id => data.recipes[parseInt(id)])[0];
    if (!recipe)
        return null;
    return recipe[0];
}