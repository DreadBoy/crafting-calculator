"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const router = require('koa-better-router')().loadMethods();
const bodyParser = require('koa-bodyparser');
router.get('/', (ctx, next) => {
    ctx.body = { message: `Hello world!` };
    return next();
});
router.post('crafting-calculator', (ctx, next) => {
    const body = ctx.request.body;
});
const app = new Koa();
app.use(bodyParser());
app.use(router.middleware());
app.listen(3000);
//# sourceMappingURL=app.js.map