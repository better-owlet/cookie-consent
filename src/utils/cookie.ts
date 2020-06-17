export const getCookie = function (key: string) {
  return (
    decodeURIComponent(
      document.cookie.replace(
        new RegExp(
          '(?:(?:^|.*;)\\s*' + encodeURIComponent(key).replace(/[-.+*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$',
        ),
        '$1',
      ),
    ) || null
  );
};

export const setCookie = function (
  key: string,
  value: string,
  expiryDays?: number,
  domain?: string,
  path?: string,
  secure?: boolean,
) {
  const exdate = new Date();
  exdate.setHours(exdate.getHours() + (expiryDays || 365) * 24);
  document.cookie =
    encodeURIComponent(key) +
    '=' +
    encodeURIComponent(value) +
    '; expires=' +
    exdate.toUTCString() +
    (domain ? '; domain=' + domain : '') +
    (path ? '; path=' + path : '') +
    (secure ? '; secure' : '');
};

export const hasCookie = function (sKey: string | number | boolean) {
  return new RegExp('(?:^|;\\s*)' + encodeURIComponent(sKey).replace(/[-.+*]/g, '\\$&') + '\\s*\\=').test(
    document.cookie,
  );
};

export const removeCookie = function (sKey: string | number | boolean, sPath: string, sDomain: string) {
  if (!sKey || !hasCookie(sKey)) {
    return false;
  }
  document.cookie =
    encodeURIComponent(sKey) +
    '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' +
    (sDomain ? '; domain=' + sDomain : '') +
    (sPath ? '; path=' + sPath : '');
  return true;
};
