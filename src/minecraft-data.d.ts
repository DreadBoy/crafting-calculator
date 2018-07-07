export type CraftingItemId = number;

export type CraftingItemMetadata = number;

export type CraftingItem = {
    id: CraftingItemId
    metadata: CraftingItemMetadata
    count: number
}

export type RecipeItem = CraftingItemId | [CraftingItemId, CraftingItemMetadata] | CraftingItem

export type ShapeRow = RecipeItem[];

export type Shape = ShapeRow[];

export type ShapedRecipe = {
    inShape: Shape
    result: RecipeItem
    outShape?: Shape
}
export type ShapelessRecipe = {
    ingredients: RecipeItem[]
    result: RecipeItem
    outShape?: Shape
}

export type ShapedOrShapelessRecipe = ShapedRecipe & ShapelessRecipe

export type Recipe = Array<ShapedOrShapelessRecipe>

export type Recipes = {
    [id: number]: Recipe
}

export type Block = {
    id: number
    displayName: string
    name: string
    hardness: number | null
    stackSize: number
    diggable: boolean
    boundingBox: 'block' | 'empty'
    material?: string
    harvestTools?: {}
    variations?: {}[]
    drops: {}[]
    transparent: boolean
    emitLight: number
    filterLight: number
}

export type Blocks = {
    [id: number]: Block
}

export type Item = {
    id: number
    displayName: string
    stackSize: number
    name: string
    variations: {}[]
}

export type Items = {
    [id: number]: Item
}

export type data = {
    recipes: Recipes
    blocks: Blocks
    items: Items
}