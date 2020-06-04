import Base from './Base';
import Utilities from './Utilities';

export default class Filter extends Base {
  constructor(options = {}) {
    super(options);
  }

  createBlacklist(type: string) {
    var services: {
      [x: string]: any;
    } = {};
    for (var service in this.options.services) {
      if (this.options.services[service].type === type) {
        if (this.options.categories[this.options.services[service].category].needed === false) {
          if (this.options.categories[this.options.services[service].category].wanted === false) {
            services[service] = this.options.services[service];
          }
        }
      }
    }

    var blacklist = [];

    for (var service in services) {
      var type = Utilities.objectType(services[service].search);
      if (type === 'String') {
        blacklist.push(services[service].search);
      } else if (type === 'Array') {
        for (let i = 0; i < services[service].search.length; i++) {
          blacklist.push(services[service].search[i]);
        }
      }
    }

    return blacklist;
  }
}
