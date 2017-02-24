// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');

// 创建一个Koa对象表示web app本身:
const app = new Koa();



app.use(async(ctx,next) =>//we call funciton async as middleware
{
    //ctx 是一个包含request和response的object
    console.log(`${ctx.request.method}${ctx.request.url}`);//print URL
    await next();//call next middleware
});

app.use(async (ctx,next) =>
{
    const start = new Date().getTime();//now time
    await next();//调用下一个 app.use(...)next middleware.所以顺序非常重要
    const ms = new Date().getTime() - start;//cost time
    console.log(`Time: ${ms}ms`);// print cost time
});

// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
    //await next();所以有没有这个没什么关系
    //设置response的content-Type:
    ctx.response.type = 'text/html';
    //设置response的内容:
    ctx.response.body = '<h1>Hello, koa2!</h1>';
});

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');

//检测用户的权限的middleware可以决定是否继续处理请求，还是直接返回403错误：
// app.use(async (ctx, next) => {
//     if (await checkUserPermission(ctx)) {
//         await next();
//     } else {
//         ctx.response.status = 403;
//     }
// });