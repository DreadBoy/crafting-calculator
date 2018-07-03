import * as Koa from 'koa';
const router = require('koa-better-router')().loadMethods()
const bodyParser = require('koa-bodyparser');

router.get('/', (ctx: Koa.Context, next: Function) => {
  ctx.response.body = { message: `Hello world!` };
  return next()
})

router.post('crafting-calculator', (ctx: Koa.Context, next: Function) => {
  const body = ctx.request.body as FulfillmentRequest;
  ctx.response.body = {
    fulfillmentText: "Hi Muffin!",
  };
  console.log(ctx);
});

const app = new Koa();
app.use(bodyParser());
app.use(router.middleware());
app.listen(process.env.PORT || 1338);