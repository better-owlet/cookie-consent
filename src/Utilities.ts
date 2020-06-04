export default class Utilities {
  static options: any;
  static ready(listener: EventListenerOrEventListenerObject) {
    document.addEventListener('DOMContentLoaded', listener);
  }

  static objectType(obj: any): string {
    return Object.prototype.toString.call(obj).slice(8, -1);
  }

  static removeCookie() {
    document.cookie = `cconsent=; expires=Thu, 01 Jan 1980 00:00:00 UTC; path=/;`;
  }

  // Create an array of services from Cookieconsent global object
  // Filter based on category or leave empty is all is wanted
  static listGlobalServices(category?: string) {
    let categories = [];

    // Global config objectnot set
    // if (typeof window.CookieConsent === 'undefined') return categories;

    // Category is not specified or opposite
    if (typeof category === 'undefined') {
      for (let key in this.options.services) {
        categories.push(key);
      }
    } else {
      for (let key in this.options.services) {
        if (this.options.services[key].category === category) categories.push(key);
      }
    }

    return categories;
  }
}
