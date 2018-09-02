const Router = require('koa-router');
const router = new Router();
const jwt = require('../jwt/jwt');

router.post('/get', async (ctx) => {
    const payload = { gen_at: Number(new Date()) };
    try {
        const token = await jwt.sign(payload);
        ctx.body = token;
        console.log(`generated ${token}`);
        return ctx.status = 200;
    }
    catch (error) {
        return ctx.status = 500;
    }
});


// 驗證 header or param
router.post('/check', async (ctx) => {
    // 取 token 順序 : header -> body -> querystring
    const token = ctx.headers.jwt || ctx.request.body.jwt || ctx.request.query.jwt;
    try {
        const decoded = await jwt.verify(token);
        if (!decoded)
            throw new Error(`no decoded`);
        console.log(`verified: ${decoded}`)
        return ctx.status = 200;
    }
    catch (error) {
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


module.exports = router;