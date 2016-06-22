/**
 * See Some for jsdoc
 * @type {Object}
 */
const None = Object.create({
  get value() {
    throw new Error('Called value on none');
  },

  nonEmpty: false,
  isDefined: false,
  isEmpty: true,

  contains(value) {
    return false;
  },

  exists(predicate) {
    return false;
  },

  filter(predicate) {
    return None;
  },

  filterNot(predicate) {
    return None;
  },

  map () {
    return None;
  },

  flatMap () {
    return None;
  },

  forEach(predicate) {
    // NOOP
  },

  toArray () {
    return [];
  },

  orElse: callOrReturn,

  valueOrElse: callOrReturn
});

function callOrReturn(value) {
  if (typeof(value) === 'function') {
    return value();
  } else {
    return value;
  }
}

class Some {

  constructor(value) {
    this._value = value;


    /**
     * Returns true if the option is Some, false if the option is None
     *
     * @property {boolean}
     */
    this.nonEmpty = true;

    /**
     * Returns true if the option is Some, false if the option is None
     *
     * @proptery {boolean}
     */
    this.isDefined = true;

    /**
     * Returns false if the option is Some, true if the option is None
     *
     * @returns {boolean}
     */
    this.isEmpty = false;

  }

  /**
   * Whether or not this Option is Some and the value is equal to the passed arg
   *
   * @param value
   * @returns {boolean}
   */
  contains(value) {
    return this._value === value;
  }

  /**
   * Whether or not this Option is Some and the result of the predicate is true
   *
   * @param {callback => boolean} predicate
   * @returns {boolean}
   */
  exists(predicate) {
    return !!predicate(this._value);
  }

  /**
   * Returns self if the predicate is true, other wise returns None
   *
   * @param predicate
   * @returns {*}
   */
  filter(predicate) {
    if (this.exists(predicate)) {
      return this;
    }
    else {
      return None;
    }
  }

  /**
   * Returns self if the predicate is true, otherwise returns None
   *
   * @param predicate
   * @returns {*}
   */
  filterNot(predicate) {
    if (this.exists(predicate)) {
      return None;
    }
    else {
      return this;
    }
  }

  /**
   * @callback mapFunction
   * @param {t} type
   * @return{b} transformedType
   */

  /**
   * @callback flatMapFunction
   * @param {t} type
   * @return {Option.<b>} maybeTransformedType
   */

  /**
   * @param mapFunction
   * @returns {Some}
   */
  map(mapFunction) {
    return new Some(mapFunction(this._value));
  }

  /**
   * @param {flatMapFunction} flatMapFunction
   * @returns {*}
   */
  flatMap(flatMapFunction) {
    return flatMapFunction(this._value);
  }

  /**
   * Applies the function to the value if the option is defined, used for functions
   * operations where the result of the operation isn't needed or the operation is a
   * side effect
   *
   * example:
   *
   * option('foo').forEach(console.log) // logs foo to the console
   * option(null).forEach(console.log) // does nothing
   *
   * @param func
   */
  forEach(func) {
    func(this._value);
  }

  /**
   * Casts the option to an array
   *
   * @returns {*[]}
   */
  toArray() {
    return [this._value];
  }

  /**
   * Calls the provided function in the event of None
   *
   * @param {function}
   * @returns {Some}
   */
  orElse(value) {
    return this;
  }

  /**
   * Returns the value of the option if it exists, will fail if called on None
   * @returns {*}
   */
  get value() {
    return this._value;
  }

  /**
   * Returns the value of the option if it exists, or the the default value if not.
   *
   * @param value
   * @returns {*}
   */
  valueOrElse(value) {
    return this._value;
  }
}

export const isOption = (value) => value === None || value instanceof Some;
export const some = (value) => new Some(value);
export const none = None;
export const option = (value) => !!value ? some(value) : none;
export default option;
