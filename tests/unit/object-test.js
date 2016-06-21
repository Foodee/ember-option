import {module, test} from 'qunit';
import Ember from 'ember';
import 'addon/object';

module('Unit | object');

// Replace this with your real tests.
test('does extend object', function (assert) {

  console.log("Writing Object");

  const myObject = Ember.Object.create({
    foo: null,
    bar: '',
    baz: [],
    qux: {}
  });

  console.log(myObject);
  console.log(myObject.get('foo'));
  console.log(Ember.Object.prototype.getAsOption);

  assert.ok(myObject.getAsOption('foo').isEmpty);
  assert.ok(myObject.getAsOption('bar').isEmpty);
  assert.ok(myObject.getAsOption('baz').isDefined);
  assert.ok(myObject.getAsOption('qux').isDefined);
});
