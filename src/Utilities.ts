export default class Utilities {
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
  static listGlobalServices(services: {[x: string]: any}, category?: string) {
    let categories = [];

    // Global config objectnot set
    // if (typeof window.CookieConsent === 'undefined') return categories;

    // Category is not specified or opposite
    if (typeof category === 'undefined') {
      for (let key in services) {
        categories.push(key);
      }
    } else {
      for (let key in services) {
        if (services[key].category === category) categories.push(key);
      }
    }

    return categories;
  }

  static mergeOptions(defaults: any, o: any): any {
    const loopProperties = (overwrites: any) => (obj: {[x: string]: any}, [key, value]: any) => {
      if (value instanceof Object && !(value instanceof Array)) {
        if (overwrites[key] instanceof Object && !(overwrites[key] instanceof Array)) {
          obj[key] = Object.entries(value).reduce(loopProperties(overwrites[key]), {});
        } else {
          obj[key] = value;
        }
      } else {
        if (overwrites.hasOwnProperty(key)) {
          obj[key] = overwrites[key];
        } else {
          obj[key] = value;
        }
      }
      return obj;
    };
    return Object.entries(defaults).reduce(loopProperties(o), {});
  }
}
