"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const intents_1 = require("./intents");
const recipes_1 = require("./recipes");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const app = new Koa();
const router = new Router();
router.get('/', (ctx, next) => {
    ctx.response.body = { message: `Hello world!` };
    return next();
});
router.post('/crafting-calculator', (ctx, next) => {
    const body = ctx.request.body;
    ctx.response.body = intents_1.getIntent(body.queryResult.intent.name)(body.queryResult.parameters.Item, body.queryResult.parameters.Amount);
    return next();
});
router.post('/crafting-calculator', (ctx, next) => {
    const body = ctx.request.body;
    ctx.response.body = intents_1.getIntent(body.queryResult.intent.name)(body.queryResult.parameters.Item, body.queryResult.parameters.Amount);
    return next();
});
router.get('/all-items', (ctx, next) => {
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
    .use(router.allowedMethods())
    .listen(process.env.PORT || 1338);
//# sourceMappingURL=app.js.map