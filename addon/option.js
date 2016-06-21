const None = Object.create({
  get value() {
    throw new Error('Called value on none');
  },

  nonEmpty() {
    return false;
  },

  isDefined() {
    return false;
  },

  isEmpty() {
    return true;
  },

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

  toArray () {
    return [];
  },

  orElse: callOrReturn,

  getOrElse: callOrReturn
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
    this.value(value);
  }

  /**
   * Returns true if the option is Some, false if the option is None
   *
   * @returns {boolean}
   */
  nonEmpty() {
    return true;
  }

  /**
   * Returns true if the option is Some, false if the option is None
   *
   * @returns {boolean}
   */
  isDefined() {
    return true;
  }

  /**
   * Returns false if the option is Some, true if the option is None
   *
   * @returns {boolean}
   */
  isEmpty() {
    return false;
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
   * Returns self if the predicate is false , otherwise returns None
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
  getOrElse(value) {
    return this._value;
  }
}

export const isOption = (value) => value === None || value instanceof Some;
export const some = (value) => new Some(value);
export const none = None;
export const option = (value) => !!value ? some(value) : none;
