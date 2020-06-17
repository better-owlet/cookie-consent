import InsertScriptFilter from './InsertScriptFilter';
import ScriptTagFilter from './ScriptTagFilter';
import WrapperFilter from './WrapperFilter';
import LocalCookieFilter from './LocalCookieFilter';
import Interface from './Interface';
import Base from './Base';
import RemoveCookies from './RemoveCookies';

export default class Scio extends Base {
  wrapper: ((name: string | undefined, callback: () => void) => void) | undefined;
  constructor(configObject: any) {
    super(configObject);

    this.init();
  }

  init() {
    console.log('init-----');

    const removeCookies = new RemoveCookies(this.options);
    const insertScriptFilter = new InsertScriptFilter(this.options);
    const scriptTagFilter = new ScriptTagFilter(this.options);
    const wrapperFilter = new WrapperFilter(this.options);
    const localCookieFilter = new LocalCookieFilter(this.options);

    removeCookies.init();
    insertScriptFilter.init();
    scriptTagFilter.init();
    wrapperFilter.init();
    localCookieFilter.init();

    const UI = new Interface(this.options);
    this.wrapper = wrapperFilter.wrapper;
    UI.buildInterface(() => {
      UI.addEventListeners();
    });
  }
}
