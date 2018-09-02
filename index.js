const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const routers = {
    token: require('./router/token'),
    session: require('./router/session'),
};

router.use('/token', routers.token.routes());
router.use('/session', routers.session.routes());

app.use(bodyParser());
app.use(logger());
app.use(router.routes());

app.listen(80);