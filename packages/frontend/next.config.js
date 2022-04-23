const nextCompose = require('next-compose-plugins')
const { withFonts } = require('@moxy/next-common-files')
const TerserPlugin = require('terser-webpack-plugin')
const withPWA = require('next-pwa')
const getGeneratedPreCacheEntries = require('./src/utils/helpers/pwa')
// const runtimeCaching = require('next-pwa/cache')
const { nanoid } = require('nanoid')

const isDEV = process.env.NODE_ENV !== 'production'

const pages = [
  {
    route: '/',
    precacheHtml: false,
    precacheJson: false,
  },
]

const buildID = nanoid()

const pwaConfig = {
  pwa: {
    sw: '/sw.js',
    disable: isDEV,
    dest: './public',
    // runtimeCaching,
    reloadOnOnline: false,
    swSrc: './public/worker-service.js',
    // exclude: [/public/, /__next/],
    buildExcludes: [/middleware-manifest\.json$/],
    importScripts: [
      'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js',
    ],
    additionalManifestEntries: [...getGeneratedPreCacheEntries(buildID, pages)],
  },
}

const config = {
  generateBuildId: async () => {
    return buildID
  },
  // target: "serverless",
  images: {
    domains: [
      'source.unsplash.com',
      'ella-production-5ju3drtb2a-et.a.run.app',
      'storage.googleapis.com',
      'global-cdn.shipper.id',
    ],
  },
  reactStrictMode: true,

  webpack: config => {
    const newConfig = config

    newConfig.resolve.alias = {
      ...config.resolve.alias,
    }

    if (process.env.NODE_ENV === 'production') {
      newConfig.optimization.minimizer = [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
            },
          },
        }),
      ]
    }

    return newConfig
  },
}

module.exports = nextCompose([withFonts(), withPWA(pwaConfig)], config)
// module.exports = pwaConfig
