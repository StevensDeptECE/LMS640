//Turn name to first letter Uppercase, others lowercase
'use strict';

function normalize(arr) {
    return arr.map(function(x){return x.substring(0,1).toUpperCase()+x.substring(1).toLowerCase()});
 
}
if (normalize(['adam', 'LISA', 'barT']).toString() === ['Adam', 'Lisa', 'Bart'].toString()) {
    alert('测试通过!');
}
else {
    alert('测试失败!');
}
//Turn strings to numbers
var arr = ['1', '2', '3'];
var r;
r= arr.map(function(x){return parseInt(x)});
alert('[' + r[0] + ', ' + r[1] + ', ' + r[2] + ']');
//Turn string to array, then turn array to a number
function string2int(s) {
return s.split().reduce(function(x,y){
return x*10+y;});
}
//Multiply numbers in array
function product(arr) {
    var s=arr.reduce(function(x,y){
return x*y;
});
return s;

}
//If pi is given, use given one, else use 3.14
function area_of_circle(r, pi) {
    if(arguments.length<2){
return 3.14*r*r;}
else{
return pi*r*r;
}
//hello everyone
var arr = ['Bart', 'Lisa', 'Adam'];
for(var i of arr){
alert("Hello, "+i);
}
//delete repeated element
var r
var arr = ['apple', 'strawberry', 'banana', 'pear', 'apple', 'orange', 'orange', 'strawberry'];

r = arr.filter(function (element, index, self) {
    return self.indexOf(element) === index;
});
alert(r.toString());
//get prime number
function get_primes(arr) {
function primes(n) {
        if (n <= 1) {
            return false;
        }
        var max = Math.sqrt(n);
          for (let i=2; i<=max; i++) {
            if (n % i === 0) {
                return false;
            }
        }
        return true;
    }
    return arr.filter(primes);

function primes(n) {
        if (n <= 1) {
            return false;
        }
        var max = Math.sqrt(n);
          for (let i=2; i<=max; i++) {
            if (n % i === 0) {
                return false;
            }
        }
        return true;
    }
    return arr.filter(primes);
 
}
//sort an array
var arr = [10, 20, 1, 2];
arr.sort(function (x, y) {
    if (x < y) {
        return -1;
    }
    if (x > y) {
        return 1;
    }
    return 0;
}); // [1, 2, 10, 20]
//sort unconsider uppercase or lowercase
var arr = ['Google', 'apple', 'Microsoft'];
arr.sort(function (s1, s2) {
    x1 = s1.toUpperCase();
    x2 = s2.toUpperCase();
    if (x1 < x2) {
        return -1;
    }
    if (x1 > x2) {
        return 1;
    }
    return 0;
}); // ['apple', 'Google', 'Microsoft']
//sort function
var a1 = ['B', 'A', 'C'];
var a2 = a1.sort();
a1; // ['A', 'B', 'C']
a2; // ['A', 'B', 'C']
a1 === a2; // true
//arrow function
(x, y, ...rest) => {
    var i, sum = x + y;
    for (i=0; i<rest.length; i++) {
        sum += rest[i];
    }
    return sum;
}
x => {
    if (x > 0) {
        return x * x;
    }
    else {
        return - x * x;
    }
}
//generator, return many times
function* fib(max) {
    var
        t,
        a = 0,
        b = 1,
        n = 1;
    while (n < max) {
        yield a;
        t = a + b;
        a = b;
        b = t;
        n ++;
    }
    return a;
}
//
var re = /^\d{3}\-\d{3,8}$/;
re.test('010-12345'); // true
re.test('010-1234x'); // false
re.test('010 12345'); // false
//
'a,b, c  d'.split(/[\s\,]+/); // ['a', 'b', 'c', 'd']
//
var re = /^(0[0-9]|1[0-9]|2[0-3]|[0-9])\:(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|[0-9])\:(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|[0-9])$/;
re.exec('19:05:30'); // ['19:05:30', '19', '05', '30']
//define if it is an email address
var re = /^[a-zA-Z][0-9a-zA-Z\.]*\@[0-9a-zA-Z]*\.[a-zA-Z]*$/
re.test("someone@gmail.com");


