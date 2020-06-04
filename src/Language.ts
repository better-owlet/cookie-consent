import Base from './Base';

export default class Language extends Base {
  constructor(options = {}) {
    super(options);
  }

  setLocale(locale: any) {
    this.options.language.current = locale;
  }

  static getTranslation(object: any, locale: any, key: any) {
    var currentLocale;

    if (!object.hasOwnProperty('language')) return '[Missing language object]';
    if (!object.language.hasOwnProperty('locale')) return '[Missing locale object]';

    currentLocale = object.language.locale.hasOwnProperty(locale) ? locale : 'en';

    return object.language.locale[currentLocale].hasOwnProperty(key)
      ? object.language.locale[currentLocale][key]
      : '[Missing translation]';
  }
}
