process.nextTick(function()
{
    console.log('nextTick callback!');
});
console.log('nextTick was set!');