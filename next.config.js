const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {}
})

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  reactStrictMode: true
})
