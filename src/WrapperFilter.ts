import Filter from './Filter';

export default class WrapperFilter extends Filter {
  constructor(options = {}) {
    super(options);
  }

  init() {
    this.filterWrappers();
  }

  filterWrappers() {
    var blacklist = super.createBlacklist('wrapped');

    function wrapper(name = '', callback: () => void) {
      if (blacklist.indexOf(name) < 0) {
        callback();
      }
    }

    this.wrapper = wrapper;
  }
}
