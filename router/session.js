const Router = require('koa-router');
const router = new Router();
const SessionMap = new Map();
const jwt = require('../jwt/jwt');

// 預先驗證 token
router.use(['/get', '/set'], async (ctx, next) => {
    const token = ctx.headers.jwt || ctx.request.body.jwt || ctx.request.query.jwt;
    try {
        if (!token)
            throw new Error(`no token`);

        const decoded = await jwt.verify(token);

        if (!decoded)
            throw new Error(`no decoded`);

        console.log(`verified: ${decoded}`);
        ctx.token = token;
        ctx.decoded = decoded;
        return next();
    }
    catch (error) {
        if (token)
            SessionMap.delete(token);
        if (error.name === 'TokenExpiredError') {
            // verify failed
            console.warn(`verify failed`);
            return ctx.status = 403;
        }
        else if (error.name === 'JsonWebTokenError') {
            // verify failed
            console.warn(`verify failed`);
            return ctx.status = 403;
        }
        else {
            console.error(`error: ${error.message}`);
            return ctx.status = 500;
        }
    }
});


router.post('/get', (ctx) => {
    ctx.body = SessionMap.get(ctx.token) || {};
    return ctx.status = 200;
});


router.post('/set', (ctx) => {
    const session = ctx.request.body;
    const s = SessionMap.get(ctx.token) || {};
    for (const prop in session) {
        s[prop] = session[prop];
    }
    SessionMap.set(ctx.token, s);
    return ctx.status = 200;
});

module.exports = router;