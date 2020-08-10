const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: '今天是个好日子呐',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'swiper/css/swiper.css',
    './static/iconfont/iconfont.css',
    {
      src: 'assets/less/font.less',
      lang: 'less'
    },
    {
      src: 'assets/less/common.less',
      lang: 'less'
    }
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/element-ui',
    { src: '@/plugins/hightlight.js', ssr: false },
    { src: '@/plugins/mavon-editer.js', ssr: false },
    { src: '@/plugins/live2d.js', ssr: false },
    { src: '~/plugins/main', ssr: true },
    { src: '~/plugins/swiper.js', ssr: false },
    { src: '~/plugins/rem.js', ssr: false },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@nuxtjs/proxy'
  ],
  /**
   * less global Support
   */
  //   styleResources: {
  //     less: './assets/**/*.less'
  //   },
  /**
   * 代理
   */
  proxy: {
    '/api': {
      target: 'https://wangzz.site',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api'
      }
    }
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) { },
    filenames: {
      chunk: ({ isDev }) => (isDev ? '[name].js' : '[id].[contenthash].js')
    },
    plugins: [
      new MomentLocalesPlugin({
        localesToKeep: ['zh-cn'],
    }),
    ]
  },
  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0' // default: localhost,
  }
}
