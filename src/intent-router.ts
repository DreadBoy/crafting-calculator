import * as Koa from 'koa';
import {getIntent} from './intents';
import {FulfillmentRequest} from './types';
import * as Router from 'koa-router';

const router = new Router();

router.post('/crafting-calculator', (ctx: Koa.Context, next: Function) => {
    const body = ctx.request.body as FulfillmentRequest;
    ctx.response.body = getIntent(body.queryResult.intent.name)(body.queryResult.parameters);
    return next();
});

export {
    router
};