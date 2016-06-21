import Ember from 'ember';
import option from './option';

/**
 * Reopen the prototype in order to apply our option
 */
export default function () {

  Ember.Object.reopen({

    /**
     * Returns an option Some/None of the value at the given key.
     *
     * @param {string} key
     * @returns {Option}
     */
    getAsOption(key){
      return option(this.get(key));
    }
  });
}
