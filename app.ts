import * as Koa from 'koa';
import {FulfillmentRequest} from './types';
import {getIntent} from './intents';

const router = require('koa-better-router')().loadMethods();
const bodyParser = require('koa-bodyparser');

router.get('/', (ctx: Koa.Context, next: Function) => {
    ctx.response.body = {message: `Hello world!`};
    return next()
});

router.post('crafting-calculator', (ctx: Koa.Context, next: Function) => {
    const body = ctx.request.body as FulfillmentRequest;
    ctx.response.body = getIntent(body.queryResult.intent.name)(body.queryResult.parameters.Item, body.queryResult.parameters.Amount);
    return next();
});

const app = new Koa();
app.use(bodyParser());
app.use(router.middleware());
app.listen(process.env.PORT || 1338);