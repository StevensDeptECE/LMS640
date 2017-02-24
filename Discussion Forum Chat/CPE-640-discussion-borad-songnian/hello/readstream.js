'use strict'

var fs = require('fs');

//open one stream

var rs = fs.createReadStream('xml.txt','utf-8');

rs.on('data',function(chunk)
{
    console.log('DATA1:');
    console.log('DATA2:');
    console.log(chunk);
});

rs.on('end',function()
{
    console.log('END');
});

rs.on('error',function(err)
{
    console.log('ERROR:' + err);
});

//以流的方式写入数据

var ws1