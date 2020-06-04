import InsertScriptFilter from './InsertScriptFilter';
import ScriptTagFilter from './ScriptTagFilter';
import WrapperFilter from './WrapperFilter';
import LocalCookieFilter from './LocalCookieFilter';
import Interface from './Interface';
import Base from './Base';
import RemoveCookies from './RemoveCookies';

export default class CookieConsent extends Base {
  constructor(configObject: any) {
    super(configObject);

    this.init(configObject);
  }

  init(configObject: any) {
    // new Configuration(configObject);
    console.log('init-----');

    const removeCookies = new RemoveCookies(configObject);
    const insertScriptFilter = new InsertScriptFilter(configObject);
    const scriptTagFilter = new ScriptTagFilter(configObject);
    const wrapperFilter = new WrapperFilter(configObject);
    const localCookieFilter = new LocalCookieFilter(configObject);

    removeCookies.init();
    insertScriptFilter.init();
    scriptTagFilter.init();
    wrapperFilter.init();
    localCookieFilter.init();

    const UI = new Interface();

    UI.buildInterface(() => {
      UI.addEventListeners();
    });
  }
}
