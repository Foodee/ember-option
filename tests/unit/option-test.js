/* jshint expr:true */
import  {expect} from 'chai';
import {
  describe,
  it,
  fail
} from 'mocha';

import option from 'ember-option/option';

describe('Option', () => {
  // Replace this with your real tests.
  it('should build to None from null', () => {
    expect(option(null).isDefined).to.equal(false);
    expect(option(null).nonEmpty).to.equal(false);
    expect(option(null).isEmpty).to.equal(true);
  });

  it('should build to None from undefined', () => {
    expect(option(undefined).isDefined).to.equal(false);
    expect(option(undefined).nonEmpty).to.equal(false);
    expect(option(undefined).isEmpty).to.equal(true);
  });

  it('should build to None from an empty string', () => {
    expect(option('').isDefined).to.equal(false);
    expect(option('').nonEmpty).to.equal(false);
    expect(option('').isEmpty).to.equal(true);
  });

  it('should build to Some from a non empty string', () => {
    expect(option('a').isDefined).to.equal(true);
    expect(option('a').nonEmpty).to.equal(true);
    expect(option('a').isEmpty).to.equal(false);
  });

  it('should build to Some from a number', () => {
    expect(option(1).isDefined).to.equal(true);
    expect(option(1).nonEmpty).to.equal(true);
    expect(option(1).isEmpty).to.equal(false);
  });

  it('should build to Some from an object', () => {
    expect(option({}).isDefined).to.equal(true);
    expect(option({}).nonEmpty).to.equal(true);
    expect(option({}).isEmpty).to.equal(false);
  });

  it('should build to Some from an array', () => {
    expect(option([]).isDefined).to.equal(true);
    expect(option([]).nonEmpty).to.equal(true);
    expect(option([]).isEmpty).to.equal(false);
  });

  it('should map its value', () => {
    expect(option(2).map(_ => _ * 2).value).to.equal(4);
    expect(option(null).map(_ => _ * 2).isDefined).to.equal(false);
  });

  it('should forEach its value', () => {
    let a = null;
    let b = null;

    option(2).forEach(_ => a = 'foo');
    option(null).forEach(_ => b = 'bar');

    expect(a).to.equal('foo');
    expect(b).to.equal(null);
  });

  it('should exists its value', () => {
    expect(option(2).exists(_ => _ === 2)).to.equal(true);
    expect(option(4).exists(_ => _ === 2)).to.equal(false);
    expect(option(null).exists(_ => _ === 2)).to.equal(false);
  });

  it('should contains its value', () => {
    expect(option(2).contains(2)).to.equal(true);
    expect(option(4).contains(2)).to.equal(false);
    expect(option(null).contains(2)).to.equal(false);
    expect(option(null).contains(null)).to.equal(false);
  });

  it('should flat map its value', () => {
    expect(option(2).flatMap(_ => option(4)).value).to.equal(4);
    expect(option(2).flatMap(_ => option(null)).isDefined).to.equal(false);
  });

  it('should filter its value', () => {
    expect(option(2).filter(_ => _ === 2).value).to.equal(2);
    expect(option(2).filter(_ => _ === 4).isDefined).to.equal(false);
  });

  it('should filterNot its value', () => {
    expect(option(2).filterNot(_ => _ === 2).isDefined).to.equal(false);
    expect(option(2).filterNot(_ => _ === 4).value).to.equal(2);
  });

  it('should cast to an array', () => {
    expect(option(2).toArray()).to.deep.equal([2]);
    expect(option(null).toArray()).to.deep.equal([]);
  });

  it('should return a default value', () => {
    expect(option(2).valueOrElse(4)).to.equal(2);
    expect(option(null).valueOrElse(2)).to.equal(2);
  });

  it('should return a value if one exists', () => {
    expect(option(2).value).to.equal(2);
  });

  it('should throw an exception on #value for none', () => {
    try {
      option(null).value;
      fail('should throw exception');
    } catch (e) {

    }
  });

  it('should call the or else function with none', () => {
    expect(option(null).orElse(() => option(4)).value).to.equal(4);
  });

  it('should not call the or else function with none', () => {
    expect(option(2).orElse(() => option(4)).value).to.equal(2);
  });


});
