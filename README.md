[![Code Climate](https://codeclimate.com/repos/5769ac4f7a510f00850022fe/badges/cc3250a690f737000fe9/gpa.svg)](https://codeclimate.com/repos/5769ac4f7a510f00850022fe/feed)
[![Test Coverage](https://codeclimate.com/repos/5769ac4f7a510f00850022fe/badges/cc3250a690f737000fe9/coverage.svg)](https://codeclimate.com/repos/5769ac4f7a510f00850022fe/coverage)
[![Issue Count](https://codeclimate.com/repos/5769ac4f7a510f00850022fe/badges/cc3250a690f737000fe9/issue_count.svg)](https://codeclimate.com/repos/5769ac4f7a510f00850022fe/feed)

# Ember-option

Ever wanted to use Options in ember, well this addon gives you exactly that ability. Say goodbye to null checking 
your data, and hello to monadic composition.

## Usage

Simply import this addon, and it will add getAsOption('key') to the Ember.Object class.

### Null Checking
```Javascript
const Obj = Ember.Object.extend({

  foo: 'foo',
  bar: 'bar',
  baz: 'baz',
  
  /**
    * @returns {null|string}
    */   
  someFunction() {
    const foo = this.get('foo');
    const bar = this.get('bar');
    const baz = this.get('baz');
    const qux = '';
  
    if (foo !== null && bar !== null && this.get('baz'){
        qux = foo + bar + baz; 
    }
    
    return qux;
  }
});

Obj.create({
  foo: 'foo',
  bar: 'bar',
  baz: 'baz',
}).someFunction() // returns a string


Obj.create({
  foo: null,
  bar: null,
  baz: null,
}).someFunction() // likely returns a NPE 


```

The above code encourages propgation of nulls, which can lead to all kinds of trouble.

### Options

```Javascript
// using options (I'd kill for a for comprehension)

Ember.Object.extend({

  foo: 'foo',
  bar: 'bar',
  baz: 'baz',

  /**
    * @returns {Option.<string>}
    */   
  someFunction() {
    return this.getAsOption('foo')
            .flatMap(foo => 
              this.getAsOption('bar')
                .flatMap(bar => 
                  this.getAsOption('baz').map(baz => foo + bar + baz) 
                )
            )
  }
});

let maybeString = Obj.create({
  foo: 'foo',
  bar: 'bar',
  baz: 'baz',
}).someFunction(); // returns Option.<string>

maybeString.valueOrElse('foo') // foobarbaz

let maybeString2 = Obj.create({
  foo: null,
  bar: null,
  baz: null,
}).someFunction() // None
 
maybeString2.valueOrElse('something went wrong') // something went wrong
```

### Contributors

- Joe Gaudet - joe.gaudet@food.eee
- Kenneth Buck - kenneth@kennethbuck.ca

### Shout Outs

- Martin Odersky (I was a scala dev once)
- mwilliamson https://github.com/mwilliamson/node-options
