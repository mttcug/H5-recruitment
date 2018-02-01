const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const nunjucks = require('nunjucks');
const Router = require('koa-router');
const views = require('koa-view');
const static = require('koa-static');
const open = require('open');

var app = new Koa();
var router = new Router();

nunjucks.configure('views', { autoescape: true });

app
    .use(bodyParser())
    .use(static('recruitment'))
    .use(views('recruitment/view',{map: {html: 'nunjucks'}}))
    .use(router.allowedMethods())
    .use(router.routes());


router.get('/',async function (ctx,next) {
        await ctx.render('recruitment',{
            phone:18999999998
    });
} )




app.listen(3000,function () {
    open('http://localhost:3000');
})