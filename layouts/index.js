import react from 'react';
const Layout = (frontMatter) => ({ children: content }) => (
  <div>
    <h1>{frontMatter.title}</h1>
    {content}
  </div>
);
export default Layout;