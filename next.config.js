const withMdxEnhanced = require('next-mdx-enhanced')({
  layoutPath: 'layouts',
  defaultLayout: true,
  fileExtensions: ['md', 'mdx'],
  remarkPlugins: [],
  rehypePlugins: [],
});
module.exports = withMdxEnhanced({
  pageExtensions: ['js', 'jsx', 'tsx', 'ts', 'mdx', 'md'],
}); 