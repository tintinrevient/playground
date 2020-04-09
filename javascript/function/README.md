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

## The arguments parameter
* **arguments** is an array-like construct
* **arguments** has a length parameter and its entries can be fetched using array notation

```
function sum() {
  var sum = 0;
  for(var i = 0; i < arguments.length; i++){
    sum += arguments[i];
  }
  return sum; 
}
```

**arguments** is an **alias** to function parameters.

```
function infiltrate(person) {

  assert(person === 'gardener',
    'The person is a gardener');
  assert(arguments[0] === 'gardener',
    'The first argument is a gardener');
    
  arguments[0] = 'ninja';
  
  assert(person === 'ninja',
    'The person is a ninja now');
  assert(arguments[0] === 'ninja',
    'The first argument is a ninja');
    
  person = 'gardener';
  
  assert(person === 'gardener',
    'The person is a gardener once more');
  assert(arguments[0] === 'gardener',
    'The first argument is a gardener again');
}

infiltrate("gardener");
```

The concept of aliasing function parameters through the arguments object can be confusing, so JavaScript provides a way to opt out of it by using **strict mode**.

```
"use strict";

function infiltrate(person) {

  assert(person === 'gardener',
    'The person is a gardener');
  assert(arguments[0] === 'gardener',
    'The first argument is a gardener');
    
  arguments[0] = 'ninja';
  
  assert(arguments[0] === 'ninja',
  'The first argument is now a ninja');
  
  assert(person === 'gardener',
    'The person is still a gardener');
}

infiltrate("gardener");
```

## Invoking functions

### As a function:
* This type of invocation occurs when a function is invoked using the () operator.

```
function skulk(name) {}
skulk('Hattori');

(function(who){ return who; })('Hattori');

function ninja() {
  return this;
}

function samurai() {
  "use strict";
  return this;
}

assert(ninja() === window,
  "In a 'nonstrict' ninja function, " +
  "the context is the global window object");
  
assert(samurai() === undefined,
  "In a 'strict' samurai function, " +
  "the context is undefined");
```

### As a method
* the object becomes the **function context** and is available within the function via the **this** parameter.

```
var ninja = {
  skulk: function(){}
};

ninja.skulk('Hattori');

function whatsMyContext() {
  return this;
}
assert(whatsMyContext() === window,
  "Function call on window");
  
var getMyThis = whatsMyContext;
assert(getMyThis() === window,
  "Another function call in window");
  
var ninja1 = {
  getMyThis: whatsMyContext
};
assert(ninja1.getMyThis() === ninja1,
  "Working with 1st ninja");
  
var ninja2 = {
  getMyThis: whatsMyContext
};
assert(ninja2.getMyThis() === ninja2,
  "Working with 2nd ninja");
```

### As a constructor
```
function whatsMyContext(){ return this; }
new whatsMyContext();

function Ninja() {
  this.skulk = function() {
    return this;
  };
}

var ninja1 = new Ninja();
var ninja2 = new Ninja();
assert(ninja1.skulk() === ninja1,
  "The 1st ninja is skulking");
assert(ninja2.skulk() === ninja2,
  "The 2nd ninja is skulking");
```

Constructors return **primitive** values:
* If a nonobject is returned from the constructor, the returned value is ignored, and the newly created object is returned.

```
function Ninja() {
  this.skulk = function () {
     return true;
  };
  
  return 1;
}

assert(Ninja() === 1,
  "Return value honored when not called as a constructor");
  
var ninja = new Ninja();
assert(typeof ninja === "object",
  "Object returned when called as a constructor");
assert(typeof ninja.skulk === "function",
  "ninja object has a skulk method");
```

Constructors explicitly return **object** values:
* If the constructor returns an object, that object is returned as the value of the whole new expression, and the newly constructed object passed as this to the constructor is discarded.

```
var puppet = {
  rules: false
};

function Emperor() {
  this.rules = true;
  return puppet;
}

var emperor = new Emperor();

assert(emperor === puppet,
  "The emperor is merely a puppet!");
assert(emperor.rules === false,
  "The puppet does not know how to rule!");
```

### Via the function’s apply, call or bind methods

```
skulk.call(ninja, 'Hattori');
skulk.apply(ninja, ['Hattori']);
```

Bind a specific context to a function:

* Force the function context in callbacks:
```
function juggle() {
  var result = 0;
  for (var n = 0; n < arguments.length; n++) {
    result += arguments[n];
  }
  this.result = result;
}

var ninja1 = {};
var ninja2 = {};

juggle.apply(ninja1,[1,2,3,4]);
juggle.call(ninja2, 5,6,7,8);

assert(ninja1.result === 10, "juggled via apply");
assert(ninja2.result === 26, "juggled via call");
```

* The event-handling system of the browser defines the context of the invocation to be the target element of the event, which causes the context to be the <button> element, not the button object. So we set our click state on the wrong object!
```
<button id="test">Click Me!</button>
<script>
  function Button(){
     this.clicked = false;
     this.click = function(){
          this.clicked = true;
          assert(button.clicked, "The button has been clicked");
     };
  }
           
  var button = new Button();
           
  var elem = document.getElementById("test");
  elem.addEventListener("click", button.click);
</script>
```

* Every function has access to the **bind** method that creates a new function. This function has the same body, but its context is always bound to a certain object, regardless of the way we invoke it.
```
<button id="test">Click Me!</button>
<script>
  var button = {
    clicked: false,
    click: function(){
      this.clicked = true;
      assert(button.clicked,"The button has been clicked");
    }
  };
     
  var elem = document.getElementById("test"); 
  elem.addEventListener("click", button.click.bind(button));
  
  var boundFunction = button.click.bind(button);
  assert(boundFunction != button.click,
         "Calling bind creates a completly new function");
</script>
```

## Reference
