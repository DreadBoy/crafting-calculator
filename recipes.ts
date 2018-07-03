import {Recipe} from './types';

const recipes: Recipe[] = [
    {
        output: {
            plank: 4
        },
        input: {
            log: 1
        }
    },
    {
        output: {
            stick: 4
        },
        input: {
            plank: 2
        }
    },
    {
        output: {
            fence: 3
        },
        input: {
            stick: 2,
            plank: 4
        }
    }
];

function findRecipe(result: string) {
    return recipes.filter(f => Object.keys(f.output).indexOf(result) >= 0)[0]
}

export function getCost(item: string) {
    const recipe = findRecipe(item);
    if (!recipe)
        return {
            'unknown': 0
        };
    return findRecipe(item).input;
}