import * as Koa from 'koa';
import {FulfillmentRequest} from './types';
import {getIntent} from './intents';
import {getAllItemsAndBlocks, getSupportedItemsAndBlocks} from './recipes';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';

const app = new Koa();
const router = new Router();

router.get('/', (ctx: Koa.Context, next: Function) => {
    ctx.response.body = {message: `Hello world!`};
    return next();
});

router.post('/crafting-calculator', (ctx: Koa.Context, next: Function) => {
    const body = ctx.request.body as FulfillmentRequest;
    ctx.response.body = getIntent(body.queryResult.intent.name)(body.queryResult.parameters.Item, body.queryResult.parameters.Amount);
    return next();
});

router.post('/crafting-calculator', (ctx: Koa.Context, next: Function) => {
    const body = ctx.request.body as FulfillmentRequest;
    ctx.response.body = getIntent(body.queryResult.intent.name)(body.queryResult.parameters.Item, body.queryResult.parameters.Amount);
    return next();
});

router.get('/all-items', (ctx: Koa.Context, next: Function) => {
    ctx.response.body = getAllItemsAndBlocks();
    return next();
});

router.get('/supported-items/:query', (ctx: Koa.Context, next: Function) => {
    const query = ctx.params.query.toLowerCase();
    ctx.response.body = getSupportedItemsAndBlocks().filter(is => is.displayName.toLowerCase().includes(query));
    return next();
});

router.get('/supported-items', (ctx: Koa.Context, next: Function) => {
    ctx.response.body = getSupportedItemsAndBlocks();
    return next();
});

app
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(process.env.PORT || 1338);