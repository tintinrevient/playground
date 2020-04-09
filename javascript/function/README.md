# Function

## Objects

Functions are **objects**, just with an additional, special capability of being **invokable**.

```
function ninjaFunction() {}

var ninjaFunction = function() {};

ninjaArray.push(function(){});

ninja.data = function(){};

function call(ninjaFunction){
     ninjaFunction();
}
call(function(){});

function returnNewNinjaFunction() {
     return function(){};
}

var ninjaFunction = function(){};
ninjaFunction.name = "Hanzo";

var ninja = {};
ninja.name = "hitsuke";

var wieldSword = function(){};
wieldSword.swordType = "katana";
```
## Callbacks

Whenever we set up a function to be called at a later time, whether by the browser in the event-handling phase or by other code, we’re setting up a **callback**.

```
var values = [0, 3, 2, 5, 7, 4, 8, 1];

values.sort(function(value1, value2){ 
  return value1 - value2;
});
```

## Storing functions

```
var store = {
  nextId: 1,
  cache: {},
  add: function(fn) {
    if (!fn.id) {
      fn.id = this.nextId++;
      this.cache[fn.id] = fn;
      return true;
} }
};

function ninja(){}

assert(store.add(ninja),
       "Function was safely added.");
assert(!store.add(ninja),
       "But it was only added once.");
```

## Self-memoizing functions

**Memoization** is the process of building a function that’s capable of remembering its previously computed values.

```
function isPrime(value){

  if (!isPrime.answers){
    isPrime.answers = {};
  }
  
  if (isPrime.answers[value] !== undefined) {
    return isPrime.answers[value];
  }
  
  var prime = value !== 1; // 1 is not a prime
  
  for (var i = 2; i < value; i++) {
    if (value % i === 0) {
      prime = false;
      break; 
    }
  }
  
  return isPrime.answers[value] = prime;
}

assert(isPrime(5), "5 is prime!" );
assert(isPrime.answers[5], "The answer was cached!" );
```

## Defining functions

**Function declarations** and **function expressions**
* For function declarations, the function name is mandatory, whereas for function expressions it’s completely optional.
* Function expressions are always a part of another statement: e.g., the right side of an assignment expression, an argument to another function.

```
function myFun(){ return 1;}

function ninja() {

  function hiddenNinja() {
    return "ninja here"; 
  }
  
  return hiddenNinja(); 
}

var a = function() {};

myFunction(function(){});

(function namedFunctionExpression(){})();

+function(){}();
-function(){}();
!function(){}();
~function(){}();
```

**Arrow functions**
```
myArg => myArg*2
```

**Function constructors**
```
new Function('a', 'b', 'return a + b')
```

**Generator functions**

Generator functions can be exited and reentered later in the application execution, while keeping the values of their variables across these re-entrances.
```
function* myGen(){ yield 1; }
```

## Reference
