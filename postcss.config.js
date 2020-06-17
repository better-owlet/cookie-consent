module.exports = {
  plugins: [
    require('precss')(),
    require('autoprefixer')({
      cascade: false,
      add: true,
      remove: true,
    }),
    require('cssnano')({
      zindex: false,
    }),
  ],
};
