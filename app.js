const Koa = require('koa');
let router = require('koa-better-router')().loadMethods()

router.post('/', (ctx, next) => {
  ctx.body = {message: `Hello world! Prefix: ${ctx.route.prefix}`};
  return next()
})

const app = new Koa();
app.use(router.middleware());
app.listen(3000);