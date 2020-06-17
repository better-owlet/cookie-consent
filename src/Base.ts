import Utilities from './Utilities';
import loMerge from 'lodash/merge';
import defaultOptions from './options';

interface IOptions {
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
  test?: string;
}

interface Buffer {
  appendChild: any[];
  insertBefore: any[];
}

const buffer: Buffer = {
  appendChild: [],
  insertBefore: [],
};

export default class Base {
  options: IOptions;
  buffer: Buffer;
  constructor(configObject: any) {
    this.setConfiguration = this.setConfiguration.bind(this);
    this.options = defaultOptions;
    this.buffer = buffer;

    this.setConfiguration(configObject);
  }

  // Settings injector for users
  setConfiguration(configObject: any) {
    // The user overrides the default config
    loMerge(this.options, configObject);
    // this.options = Utilities.mergeOptions(this.options, configObject);
    // The cookie overrides the default and user config
    this.cookieToConfig();
  }

  // TODO根据配置更新cookies
  cookieToConfig() {
    const {options} = this;
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
          if (cookieData.version !== options.cookieVersion) {
            return removeReload();
          }
        }

        // We check if cookie data categories also exist in user config
        for (let key in cookieData.categories) {
          // The cookie contains category not present in user config so we invalidate cookie
          if (typeof options.categories[key] === 'undefined') {
            return removeReload();
          }
        }

        // We check if cookie data services also exist in user config
        cookieData.services.forEach((service: string | number) => {
          // The cookie contains service not present in user config so we invalidate cookie
          if (typeof options.services[service] === 'undefined') {
            return removeReload();
          }
        });

        // We we integrate cookie data into the global config object
        for (let key in cookieData.categories) {
          options.categories[key].checked = options.categories[key].wanted =
            cookieData.categories[key].wanted === true ? true : false;
        }

        options.cookieExists = true;
        return true;
      }
    });

    return false;
  }
}
