async (ctx, next) =>
{
    ctx.render('index.html',
    {
        title:'Welcome'
    });
}

async (ctx, next) =>
{
    var
        email = ctx.request.body.email || '',
        password = ctx.request.body.password || '';
    if( email === 'admin@example.com' && password === '123456')
    {
        ctx.render ('signin-Ok.html',{
            title:'Sign In Ok',
            name:'Mr Node'
        } );
    }
    else
    {
        ctx.render('sigin-failed.html',{
            title:'Sign In Failed'
        });
    }
}