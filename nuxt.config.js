
const env = require('dotenv').config()
const pkg = require('./package')

module.exports = {
  mode: 'universal',
  server: {
    // "host": "0.0.0.0",
    port: 3668, // default: 3000
  },
  /*
  ** Headers of the page
  */
  head: {
    title: "Go4Fun Travel Services",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    // loading: '~/components/loading.vue',
    script: [
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js",
        type: "text/javascript"
      },
      {
        src:
          "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js",
        type: "text/javascript"
      }
 
    ],

    link: [
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.7.2/css/all.css'},
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'},
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Playfair+Display&display=swap'},
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat&display=swap'}
    ]
  },
  


  serverMiddleware: ["api/index"],

  /*
  ** Customize the progress-bar color
  */
  loading: { color: 'black' },
  env: env.parsed,
  /*
  ** Global CSS
  */
  css: [
    
    {src: '~assets/css/fonts.css'},
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    "~plugins/ga.js",
    "~plugins/bootstrap.js"
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    '@nuxtjs/recaptcha',
    'nuxt-device-detect',
  ],

  recaptcha: {
    hideBadge: true,
    siteKey: process.env.recaptcha_site_key,
    version: 3
  },
  
  build: {
    /*
    ** You can extend webpack config here
    */
    vendor:['axios', 'jquery', 'bootstrap'],
    
    extend(config, ctx) {
    }
  },

  env: {
    API_URL: process.env.API_URL
  },
}
