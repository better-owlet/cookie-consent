import Utilities from './Utilities';
import loMerge from 'lodash/merge';

export default class Base {
  options: {
    // 是否激活
    active: boolean;
    // 唯一标识 cookie 是否已存在
    cookieExists: boolean;
    cookieVersion: number;
    modalMainTextMoreLink: null;
    barTimeout: number;
    theme: {
      barColor: string;
      barTextColor: string;
      barMainButtonColor: string;
      barMainButtonTextColor: string;
      modalMainButtonColor: string;
      modalMainButtonTextColor: string;
    };
    language: any;
    categories: {
      [x: string]: any;
    };
    services: {
      [x: string]: any;
    };
  };
  buffer: {
    appendChild: any[];
    insertBefore: any[];
  };
  wrapper: (name: string | undefined, callback: () => void) => void;

  constructor(configObject: any) {
    this.buffer = {
      appendChild: [],
      insertBefore: [],
    };

    // Wrapper filter function
    this.wrapper = function () {};

    // this.setConfiguration = this.setConfiguration.bind(this);

    this.options = {
      active: true,
      cookieExists: false,
      cookieVersion: 1,
      modalMainTextMoreLink: null,
      barTimeout: 1000,
      theme: {
        barColor: '#2C7CBF',
        barTextColor: '#FFF',
        barMainButtonColor: '#FFF',
        barMainButtonTextColor: '#2C7CBF',
        modalMainButtonColor: '#4285F4',
        modalMainButtonTextColor: '#FFF',
      },
      language: {
        current: 'en',
        locale: {
          en: {
            barMainText: 'This website uses cookies to ensure you get the best experience on our website.',
            barLinkSetting: 'Cookie Settings',
            barBtnAcceptAll: 'Accept all cookies',
            modalMainTitle: 'Cookie settings',
            modalMainText:
              "Cookies are small piece of data sent from a website and stored on the user's computer by the user's web browser while the user is browsing. Your browser stores each message in a small file, called cookie. When you request another page from the server, your browser sends the cookie back to the server. Cookies were designed to be a reliable mechanism for websites to remember information or to record the user's browsing activity.",
            modalBtnSave: 'Save current settings',
            modalBtnAcceptAll: 'Accept all cookies and close',
            modalAffectedSolutions: 'Affected solutions:',
            learnMore: 'Learn More',
            on: 'On',
            off: 'Off',
          },
          hu: {
            barMainText: 'Ez a weboldal Sütiket használ a jobb felhasználói élmény érdekében.',
            barLinkSetting: 'Süti beállítások',
            barBtnAcceptAll: 'Minden süti elfogadása',
            modalMainTitle: 'Süti beállítások',
            modalMainText:
              'A HTTP-süti (általában egyszerűen süti, illetve angolul cookie) egy információcsomag, amelyet a szerver küld a webböngészőnek, majd a böngésző visszaküld a szervernek minden, a szerver felé irányított kérés alkalmával. Amikor egy weboldalt kérünk le a szervertől, akkor a böngésző elküldi a számára elérhető sütiket. A süti-ket úgy tervezték, hogy megbízható mechanizmust biztosítsanak a webhelyek számára az információk megőrzésére vagy a felhasználók böngészési tevékenységének rögzítésére.',
            modalBtnSave: 'Beállítások mentése',
            modalBtnAcceptAll: 'Minden Süti elfogadása',
            modalAffectedSolutions: 'Mire lesz ez hatással:',
            learnMore: 'Tudj meg többet',
            on: 'Be',
            off: 'Ki',
          },
        },
      },
      categories: {},
      services: {},
    };

    this.setConfiguration(configObject);
  }

  // Settings injector for users
  setConfiguration = (configObject: any) => {
    // The user overrides the default config
    loMerge(this.options, configObject);

    // The cookie overrides the default and user config
    // this.cookieToConfig();
  };

  // TODO根据配置更新cookies
  cookieToConfig() {
    function removeReload() {
      Utilities.removeCookie();
      location.reload();
      return false;
    }

    document.cookie.split(';').filter(item => {
      if (item.indexOf('cconsent') >= 0) {
        var cookieData = JSON.parse(item.split('=')[1]);

        // We check cookie version. If older we need to renew cookie.
        if (typeof cookieData.version === 'undefined') {
          return removeReload();
        } else {
          if (cookieData.version !== this.options.cookieVersion) {
            return removeReload();
          }
        }

        // We check if cookie data categories also exist in user config
        for (let key in cookieData.categories) {
          // The cookie contains category not present in user config so we invalidate cookie
          if (typeof this.options.categories[key] === 'undefined') {
            return removeReload();
          }
        }

        // We check if cookie data services also exist in user config
        cookieData.services.forEach((service: string | number) => {
          // The cookie contains service not present in user config so we invalidate cookie
          if (typeof this.options.services[service] === 'undefined') {
            return removeReload();
          }
        });

        // We we integrate cookie data into the global config object
        for (let key in cookieData.categories) {
          this.options.categories[key].checked = this.options.categories[key].wanted =
            cookieData.categories[key].wanted === true ? true : false;
        }

        this.options.cookieExists = true;
        return true;
      }
    });

    return false;
  }
}
