module.exports = {
    apps: [
      {
        name: 'nuxt_web_line_notify',
        exec_mode: 'cluster',
        instances: '2', // Or a number of instances
        script: './node_modules/nuxt/bin/nuxt.js',
        args: 'start'
     
      }
    ]
  }