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
