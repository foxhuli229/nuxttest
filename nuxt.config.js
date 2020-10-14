export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || '测试nuxt1',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '这个是meta',
      },
      { hid: 'keywords', name: 'keywords', content: '关键词搜算' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Global CSS
   */
  css: ['element-ui/lib/theme-chalk/index.css', 'assets/css/transition.css'],

  /**
  * 自定义loading
  * 定义系统默认的loading效果，或者指定 loading组件
  */
  // loading: { color: '#1890ff', height: '3px' },
  loading: '@/components/loading.vue',

  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  // plugins: ['@/plugins/element-ui'],
  plugins: [{
    src: '@/plugins/element-ui',
    ssr: true
  },
  {
    src: '@/plugins/router'
  },
  {
    src: '@/plugins/axios',
    ssr: true
  }
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // 关闭eslint验证，则需要注释这里
    // '@nuxtjs/eslint-module',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true,
    // prefix: '/api/', //baseUrl前缀
    credentials: true // 表示跨域请求时是否需要使用凭证
  },

  proxy: {
    '/api/': {
      target: 'http://121.36.73.246:9004',
      pathRewite: {
        changeOrigin: true,
        // '^/api/': '/api/'
      }
    }
  },

  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    transpile: [/^element-ui/],
    vendor: ['axios'],//防止重复渲染
  },

  router: {
    middleware: 'auth',
    extendRoutes(routes, resolve) {
      //扩展路由
      routes.push({
        name: 'home',
        path: '/index',
        component: resolve(__dirname, 'pages/index.vue')
      })
    }
  },



}
