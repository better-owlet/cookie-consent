import Filter from './Filter';

type Wrapper = (name: string | undefined, callback: () => void) => void;

export default class WrapperFilter extends Filter {
  wrapper: Wrapper;
  constructor(options = {}) {
    super(options);
    this.wrapper = function () {};
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
