import Filter from './Filter';

export default class InsertScriptFilter extends Filter {
  constructor(options = {}) {
    super(options);
  }

  init() {
    this.overrideAppendChild();
    this.overrideInsertBefore();
  }

  overrideAppendChild = () => {
    Element.prototype.appendChild = <T extends Node>(newChild: any): any => {
      if (newChild && newChild.tagName === 'SCRIPT') {
        console.log('Appending:', newChild);
        for (let key in this.options.services) {
          // Did user opt-in?
          if (this.options.services[key].type === 'dynamic-script') {
            if (newChild.outerHTML.indexOf(this.options.services[key].search) >= 0) {
              if (this.options.categories[this.options.services[key].category].wanted === false) {
                this.buffer.appendChild.push({
                  this: this,
                  category: this.options.services[key].category,
                  arguments: newChild,
                });
                return undefined;
              }
            }
          }
        }
      }

      console.log('overrideAppendChild', newChild);

      return Node.prototype.appendChild.apply(this, [newChild]);
    };
  };

  overrideInsertBefore() {
    Element.prototype.insertBefore = <T extends Node>(newChild: any, refChild: Node | null): any => {
      if (newChild.tagName === 'SCRIPT') {
        //console.log('Inserting:', args);
        for (let key in this.options.services) {
          // Did user opt-in?
          if (this.options.services[key].type === 'dynamic-script') {
            if (newChild.outerHTML.indexOf(this.options.services[key].search) >= 0) {
              if (this.options.categories[this.options.services[key].category].wanted === false) {
                this.buffer.insertBefore.push({
                  this: this,
                  category: this.options.services[key].category,
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
