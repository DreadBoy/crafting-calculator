import * as Koa from 'koa';
import {getAllItemsAndBlocks, getSupportedItemsAndBlocks} from './recipes';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import {router as intentRouter} from './intent-router';

const pluralize = require('pluralize');

const app = new Koa();
const router = new Router();

router.get('/', (ctx: Koa.Context, next: Function) => {
    ctx.response.body = {message: `Hello world!`};
    return next();
});

router.get('/all-items', (ctx: Koa.Context, next: Function) => {
    const all = getAllItemsAndBlocks();
    if (ctx.request.header['accept'] === 'text/csv')
        ctx.response.body = all.map(is => {
            const displayName = is.displayName.replace(/ ?\(.*?\) ?/, '');
            const singular = pluralize.singular(displayName);
            return `"${singular}","${singular}","${pluralize.plural(singular)}"`
        }).join('\n');
    else
        ctx.response.body = all;
    return next();
});

router.get('/supported-items/:query', (ctx: Koa.Context, next: Function) => {
    const query = ctx.params.query.toLowerCase();
    ctx.response.body = getSupportedItemsAndBlocks().filter(is => is.displayName.toLowerCase().includes(query));
    return next();
});

router.get('/supported-items', (ctx: Koa.Context, next: Function) => {
    const supported = getSupportedItemsAndBlocks();
    if (ctx.request.header['accept'] === 'text/csv')
        ctx.response.body = supported.map(is => {
            const displayName = is.displayName.replace(/ ?\(.*?\) ?/, '');
            const singular = pluralize.singular(displayName);
            return `"${singular}","${singular}","${pluralize.plural(singular)}"`
        }).join('\n');
    else
        ctx.response.body = supported;
    return next();
});


app
    .use(bodyParser())
    .use(router.routes())
    .use(intentRouter.routes())
    .use(router.allowedMethods())
    .listen(process.env.PORT || 1338);