import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  mode: 'spa',
  target: 'server',
  server: {
    port: 8505, // default: 4000
    host: '0.0.0.0' // default: localhost
  },
  router: {

  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - bannayuu',
    title: 'Bannayuu',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.jpg' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.0.13/css/all.css' }
    ],
    script: [
      { src: 'https://static.line-scdn.net/liff/edge/2/sdk.js' },
      { src: 'https://unpkg.com/share-api-polyfill/dist/share-min.js' },
      { src: 'https://cdn.omise.co/omise.js' },


    ]
  },
  loading: '~/components/loading.vue',
  loadingIndicator: {
    name: 'rectangle-bounce',
    color: '#005ecb',
    background: 'white'
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/dotenv',
    'vue-social-sharing/nuxt',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    //baseURL: "https://35824214565b.jp.ngrok.io/"
   // baseURL: "http://127.0.0.1:8504/"
    baseURL: "https://cit.bannayuu.com/apiline/"
  },


 
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {

          primary: '#084c7b',
          accent: colors.grey.darken3,
          secondary: '#aeea00',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: '#2e7d32',
          red: colors.deepOrange.accent4,
          white: '#ffffff',
          black: '#000000',
          orange: '#ef6c00',
          card_primary: '#d1d9ff',
          card_success: '#00b400',
          card_blue: '#008cff',
          card_gray: '#a7a9ac',
          card_teal: '#00c896',
          card_brown: "#6a4f4b",
          navigation_menu: '#4caf50'

        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
