import Filter from './Filter';

export default class InsertScriptFilter extends Filter {
  constructor(options = {}) {
    super(options);
  }

  init() {
    this.overrideAppendChild();
    this.overrideInsertBefore();
  }

  overrideAppendChild() {
    const {buffer, options} = this;
    Element.prototype.appendChild = function <T extends Node>(newChild: any): any {
      if (newChild && newChild.tagName === 'SCRIPT') {
        // console.log('Appending:', newChild);
        for (let key in options.services) {
          // Did user opt-in?
          if (options.services[key].type === 'dynamic-script') {
            if (newChild.outerHTML.indexOf(options.services[key].search) >= 0) {
              if (options.categories[options.services[key].category].wanted === false) {
                buffer.appendChild.push({
                  this: this,
                  category: options.services[key].category,
                  arguments: newChild,
                });
                return undefined;
              }
            }
          }
        }
      }

      return Node.prototype.appendChild.apply(this, [newChild]);
    };
  }

  overrideInsertBefore() {
    const {buffer, options} = this;
    Element.prototype.insertBefore = function <T extends Node>(newChild: any, refChild: Node | null): any {
      if (newChild.tagName === 'SCRIPT') {
        console.log('Inserting:', newChild, buffer);
        for (let key in options.services) {
          // Did user opt-in?
          if (options.services[key].type === 'dynamic-script') {
            if (newChild.outerHTML.indexOf(options.services[key].search) >= 0) {
              if (options.categories[options.services[key].category].wanted === false) {
                buffer.insertBefore.push({
                  this: this,
                  category: options.services[key].category,
                  arguments: [newChild, refChild],
                });
                return undefined;
              }
            }
          }
        }
      }

      return Node.prototype.insertBefore.apply(this, [newChild, refChild]);
    };
  }
}
