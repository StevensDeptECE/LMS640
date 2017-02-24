'use strict'
//include hello modul
var greet = require('./hello');//right path
var s = 'songnian';
var arry = greet.arry;
console.log(greet.greet(s));
console.log(greet.arry);
console.log(greet.love(arry));