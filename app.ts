import * as Koa from 'koa';
const router = require('koa-better-router')().loadMethods()
const bodyParser = require('koa-bodyparser');

router.get('/', (ctx: Koa.Context, next: Function) => {
  ctx.body = { message: `Hello world!` };
  return next()
})

router.post('/crafting-calculator', (ctx: Koa.Context, next: Function) => {
  const body = ctx.request.body as FulfillmentRequest;
});

const app = new Koa();
app.use(bodyParser());
app.use(router.middleware());
app.listen(3000);