# Cookie Consent

## A Simple Cookie Consent Manager

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

It is a Javascript based solution for blocking / allowing even 3rd party cookies to comply with GDPR & CCPA.

### [demo](/)

### Feature

- Support PC and mobile cookie banner display, responsive
- Lifecycle hooks, giving users the opportunity to add your own code at specific stages
- Multi-lingual, supports EU language
- Support removing unwanted cookies
- Users can customize whether the country complies with CCPA & GDPR
- Support different UA whether to display cookie banner
- Hosted on AWS Cloudfront with edges around the globe for
- Four different blocking methods

#### Dynamic script tags

Some services insert dynamically created script tags to the HEAD at page load. These can be intercepted and blocked.

#### Script tag blocking

Some third party services require you to insert a script tag into your HTML pages. These can be inactivated until the user allowes them.

#### Script wrapping

Some services are not inserted in a SCRIPT tag and are obscured by layers of other code. Thats why this script creates a global wrapper function what you can use to wrap and blovk any JS code.

#### Local cookies

Finally the local cookies set on your domain can be also filtered by overriding the bowsers COOKIE SET method.

### Usage

#### Module

```javascript
import CookieConsent from 'cookie-consent';
// or
const CookieConsent = require('cookie-consent');
```

#### Classic

```html
<!-- Specify the version -->
<script src="./cookie-consent.umd.js"></script>
<script>
  var CookieConsent = window.CookieConsent;
</script>
```

#### Initialization

```javascript
var cc = new CookieConsent({
  //...options,
});
```

#### Configuration Options

```javascript
  new CookieConsent({
    language: 'en',
  });
  </script>
```

#### Instance Methods

#### Events

```javascript
cc.on('initialized', (...args) => console.log(args));
cc.on('error', console.error);
cc.on('popupOpened', () => console.log('Popup Open'));
cc.on('popupClosed', () => console.log('Popup Closed'));
cc.on('modalOpened', () => console.log('Modal Open'));
cc.on('modalClosed', () => console.log('Modal Closed'));
cc.on('statusChanged', (...args) => console.log(args));
```

### Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>iOS Safari |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions

### NPM scripts

- `npm t`: Run test suite
- `npm start`: Run `npm run build` in watch mode
- `npm run test:watch`: Run test suite in [interactive watch mode](http://facebook.github.io/jest/docs/cli.html#watch)
- `npm run test:prod`: Run linting and generate coverage
- `npm run build`: Generate bundles and typings, create docs
- `npm run lint`: Lints code
- `npm run commit`: Commit using conventional commit style ([husky](https://github.com/typicode/husky) will tell you to use it if you haven't :wink:)

### Automatic releases

### FAQ

Contributions of any kind are welcome!
