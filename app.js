"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const intents_1 = require("./intents");
const router = require('koa-better-router')().loadMethods();
const bodyParser = require('koa-bodyparser');
router.get('/', (ctx, next) => {
    ctx.response.body = { message: `Hello world!` };
    return next();
});
router.post('crafting-calculator', (ctx, next) => {
    const body = ctx.request.body;
    ctx.response.body = intents_1.getIntent(body.queryResult.intent.name)(body.queryResult.parameters.Item, body.queryResult.parameters.Amount);
    return next();
});
const app = new Koa();
app.use(bodyParser());
app.use(router.middleware());
app.listen(process.env.PORT || 1338);
//# sourceMappingURL=app.js.map