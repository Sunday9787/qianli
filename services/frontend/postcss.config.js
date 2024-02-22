module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    cssnano: {},
    'postcss-url': {
      url(asset) {
        switch(process.env.NODE_ENV) {
          case 'production':
            return 'http://dev.resource.qianli.com' + asset.url;
          default:
            return 'http://localhost:5712' + asset.url;
        }
      }
    }
  }
}
