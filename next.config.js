const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    // Support MDX imports
    providerImportSource: "@mdx-js/react",
    remarkPlugins: [],
    rehypePlugins: []
  }
});

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  // Configure webpack to handle MDX imports
  webpack: (config) => {
    // This is needed to make Markdown imports work correctly
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
    };
    
    return config;
  }
});
