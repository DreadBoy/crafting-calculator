import {Recipe} from './types';

const recipes: Recipe[] = [
    {
        output: [
            {
                item: 'plank',
                amount: 4
            }
        ],
        input: [
            {
                item: 'log',
                amount: 1
            }
        ]
    },
    {
        output: [
            {
                item: 'stick',
                amount: 4
            }
        ],
        input: [
            {
                item: 'plank',
                amount: 2
            }
        ]
    },
    {
        output: [
            {
                item: 'fence',
                amount: 3
            }
        ],
        input: [
            {
                item: 'stick',
                amount: 2
            },
            {
                item: 'plank',
                amount: 4
            }
        ]
    }
];

export function findRecipe(item: string) {
    return recipes.filter(f => f.output.map(is => is.item).includes(item))[0]
}