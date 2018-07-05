"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const recipes_1 = require("./recipes");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const intent_router_1 = require("./intent-router");
const pluralize = require('pluralize');
const app = new Koa();
const router = new Router();
router.get('/', (ctx, next) => {
    ctx.response.body = { message: `Hello world!` };
    return next();
});
router.get('/all-items', (ctx, next) => {
    const all = recipes_1.getAllItemsAndBlocks();
    if (ctx.request.header['accept'] === 'text/csv')
        ctx.response.body = all.map(is => {
            const displayName = is.displayName.replace(/ ?\(.*?\) ?/, '');
            const singular = pluralize.singular(displayName);
            return `"${singular}","${singular}","${pluralize.plural(singular)}"`;
        }).join('\n');
    else
        ctx.response.body = recipes_1.getAllItemsAndBlocks();
    return next();
});
router.get('/supported-items/:query', (ctx, next) => {
    const query = ctx.params.query.toLowerCase();
    ctx.response.body = recipes_1.getSupportedItemsAndBlocks().filter(is => is.displayName.toLowerCase().includes(query));
    return next();
});
router.get('/supported-items', (ctx, next) => {
    ctx.response.body = recipes_1.getSupportedItemsAndBlocks();
    return next();
});
app
    .use(bodyParser())
    .use(router.routes())
    .use(intent_router_1.router.routes())
    .use(router.allowedMethods())
    .listen(process.env.PORT || 1338);
//# sourceMappingURL=app.js.map