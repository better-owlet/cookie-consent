import Utilities from './Utilities';
import Filter from './Filter';

export default class ScriptTagFilter extends Filter {
  constructor(options = {}) {
    super(options);
  }

  init() {
    this.filterTags();
  }

  filterTags() {
    Utilities.ready(() => {
      var blacklist = super.createBlacklist('script-tag');
      var scriptTags: NodeListOf<Element> = document.querySelectorAll('script[type="text/plain"]');

      for (var scriptTag of Array.prototype.slice.call(scriptTags)) {
        if (blacklist.indexOf(scriptTag.dataset.consent) < 0) {
          var newtag = document.createElement('script');
          var parentNode = scriptTag.parentNode;

          scriptTag.type = 'text/javascript';

          for (var attribute of scriptTag.attributes) {
            newtag.setAttribute(attribute.nodeName, attribute.nodeValue);
          }

          newtag.innerHTML = scriptTag.innerHTML;
          parentNode.insertBefore(newtag, scriptTag);
          parentNode.removeChild(scriptTag);
        }
      }
    });
  }
}
