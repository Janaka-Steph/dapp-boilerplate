const {CSSModules, CSSPlugin, CSSResourcePlugin, EnvPlugin, FuseBox, JSONPlugin, QuantumPlugin, PostCSSPlugin, WebIndexPlugin, Sparky} = require('fuse-box')
const express = require('express')
const resolveId = require('postcss-import/lib/resolve-id')
const path = require('path')
const isProduction = process.env.NODE_ENV === 'production' ? true : false
const POSTCSS_PLUGINS = [
  require('postcss-import')({
    root: path.join(__dirname, 'src', 'ui'),
    resolve: (id, base, options) => resolveId(id, options.root, options),
  }),
  require('postcss-cssnext')({
    browsers: ['ie >= 11', 'last 2 versions'],
  }),
]
// Producer
const fuseConfig = {
  alias: {
    //'reactstrap-tether': '', // todo Remove this hack to fix import of reactstrap-tether
    '../../customModules/protocol/index.js': 'protocol/index.js', // hack to have working path for app and tests
    '../../customModules/protocol/truffle.js': 'protocol/truffle.js',
  },
  cache: !isProduction,
  debug: true,
  experimentalFeatures: true, // remove next major release of fb - v3
  homeDir: 'src',
  //ignoreModules : [],
  log: true,
  modulesFolder: 'customModules',
  output: 'build/$name.js',
  polyfillNonStandardDefaultUsage : true, // ["@digix/truffle-lightwallet-provider"],
  plugins: [
    EnvPlugin({
      NETWORK: process.env.NETWORK || 'testrpc',
      NODE_ENV: isProduction ? 'production' : 'development',
    }),
    [/components.*\.css$/, PostCSSPlugin(POSTCSS_PLUGINS), CSSModules(), CSSPlugin()],
    [PostCSSPlugin(POSTCSS_PLUGINS), CSSResourcePlugin({
      dist: 'build/assets',
      resolve: f => `/assets/${f}`,
    }), CSSPlugin()],
    JSONPlugin(),
    WebIndexPlugin({
      template: 'src/ui/index.html',
      path: '.',
    })
  ],
  sourceMaps: !isProduction,
  useJsNext: true, // ["@digix/truffle-lightwallet-provider"],
}
const fuse = FuseBox.init(fuseConfig)
const quantumConfig = {
  /*api: (core) => {
    core.solveComputed('bn.js/lib/bn.js') //todo Remove when BN fix it
  },*/
  bakeApiIntoBundle: 'client.min.js',
  ensureES5: true,
  manifest : true,
  removeExportsInterop: false,
  target: 'browser',
  treeshake: true,
  uglify: true,
}
// Tasks
Sparky.task('clean-cache', () => Sparky.src('.fusebox/*').clean('.fusebox/'))
Sparky.task('clean', () => Sparky.src('build').clean('build'))
Sparky.task('copy-assets', () => Sparky.src('assets/**/**.*', {base: './src/ui'}).dest('build'))
Sparky.task('default', ['clean', 'copy-assets', 'devTask'], () => {})
Sparky.task('prod', ['clean', 'copy-assets', 'prodTask'], () => {})

Sparky.task('prodTask', () => {
  const fuseServer = FuseBox.init(fuseConfig)
  fuseServer.bundle('server.js')
    .instructions('> [server/server.ts]')
  fuseServer.run()
    .then(() => {
      const fuseClientOpts = Object.assign({}, fuseConfig)
      fuseClientOpts.plugins.push(QuantumPlugin(quantumConfig))
      const fuseClient = FuseBox.init(fuseClientOpts)
      fuseClient.bundle('client.min.js')
        .target('browser')
        .instructions(`> ui/index.tsx`)
      fuseClient.run()
    })
})
Sparky.task('devTask', () => {
  fuse.dev({open: false, port: 8085, root: 'build'}, server => {
    const app = server.httpServer.app
    app.use('/assets', express.static(path.resolve('build', 'assets')))
    app.get('/client.js', (req, res) => res.sendFile(path.resolve('build', 'client.js')))
    app.get('*', (req, res) => res.sendFile(path.resolve('build', 'index.html')))
  })
  fuse.bundle('client')
    .target('browser')
    .instructions(`> ui/index.tsx`)
    .hmr()
    .watch()
  fuse.run()
})