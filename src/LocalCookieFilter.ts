import Filter from './Filter';

export default class LocalCookieFilter extends Filter {
  constructor(options = {}) {
    super(options);
  }

  init() {
    this.filterlocalCookies();
  }

  getCookieDescriptor = () => {
    var cookieDescriptor:
      | {
          get?: ((v?: any) => void) | undefined;
          set?: ((v?: any) => void) | undefined;
        }
      | undefined;

    cookieDescriptor =
      Object.getOwnPropertyDescriptor(document, 'cookie') ||
      Object.getOwnPropertyDescriptor(HTMLDocument.prototype, 'cookie');

    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/__lookupSetter__
    // if (!cookieDescriptor) {
    //   cookieDescriptor = {};
    //   cookieDescriptor.get = HTMLDocument.prototype.__lookupGetter__('cookie');
    //   cookieDescriptor.set = HTMLDocument.prototype.__lookupSetter__('cookie');
    // }
    console.log(
      'cookieDescriptor',
      Object.getOwnPropertyDescriptor(document, 'cookie') ||
        Object.getOwnPropertyDescriptor(HTMLDocument.prototype, 'cookie'),
    );
    debugger;
    return cookieDescriptor;
  };

  filterlocalCookies = () => {
    // TODO - implement buffer
    var blacklist = super.createBlacklist('localcookie');
    console.log('getCookieDescriptor', this.getCookieDescriptor());
    var cookieDescriptor = this.getCookieDescriptor() || {};

    Object.defineProperty(document, 'cookie', {
      configurable: true,
      get: () => {
        console.log('get', cookieDescriptor);
        return cookieDescriptor.get && cookieDescriptor.get.apply(document);
      },
      set: (...cookieArguments) => {
        if (blacklist.length) {
          var cookieName = cookieArguments[0].split('=')[0];
          Array.prototype.forEach.call(blacklist, function (blacklistItem) {
            if (cookieName.indexOf(blacklistItem) < 0)
              cookieDescriptor.set && cookieDescriptor.set.apply(document, cookieArguments);
          });
        } else {
          cookieDescriptor.set && cookieDescriptor.set.apply(document, cookieArguments);
        }
      },
    });
  };
}
