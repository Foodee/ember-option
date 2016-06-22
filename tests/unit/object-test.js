/* jshint expr:true */
import {expect} from 'chai';
import {
  describe,
  it
} from 'mocha';
import initializer from 'ember-option/initializers/extend-object-with-option';
import Ember from 'ember';

initializer();

describe('Object#getAsOption', function () {
  // Replace this with your real tests.
  it('should be installed on Ember.Object', function () {
    const myObject = Ember.Object.create({
      foo: null,
      bar: '',
      baz: 'baz',
      qux: true
    });

    expect(myObject.getAsOption('foo').isEmpty).to.equal(true);
    expect(myObject.getAsOption('bar').isEmpty).to.equal(true);

    expect(myObject.getAsOption('baz').isEmpty).to.equal(false);
    expect(myObject.getAsOption('qux').isEmpty).to.equal(false);

    expect(myObject.getAsOption('baz').value).to.equal('baz');
    expect(myObject.getAsOption('qux').value).to.equal(true);
  });
});
