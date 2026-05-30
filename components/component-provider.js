import Link from 'next/link';

export const mdxComponents = {
  h1: (props) => <h1 className="font-sans font-black text-4xl text-ink mb-4" {...props} />,
  h2: (props) => <h2 className="font-serif font-black text-3xl text-ink mb-3" {...props} />,
  h3: (props) => <h3 className="font-serif font-black text-2xl text-ink mb-2" {...props} />,
  h4: (props) => <h4 className="font-serif font-black text-xl text-ink mb-2" {...props} />,
  h5: (props) => <h5 className="font-serif font-black text-lg text-ink mb-1" {...props} />,
  h6: (props) => <h6 className="font-serif font-black text-base text-ink mb-1" {...props} />,
  p: (props) => <p className="mb-4" {...props} />,
  ul: (props) => <ul className="list-disc pl-6 mb-4" {...props} />,
  ol: (props) => <ol className="list-decimal pl-6 mb-4" {...props} />,
  li: (props) => <li className="mb-1" {...props} />,
  blockquote: (props) => (
    <blockquote className="tick-quote relative my-4 mx-0 pl-6 font-medium" {...props} />
  ),
  hr: () => <hr className="border-border-subtle my-8" />,
  a: ({ href, children }) => {
    const isExternal = href?.startsWith('http');
    if (isExternal) {
      return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
    }
    return <Link href={href || '/'}>{children}</Link>;
  },
  table: (props) => <table className="w-full mb-4" {...props} />,
  thead: (props) => <thead {...props} />,
  tbody: (props) => <tbody {...props} />,
  tr: (props) => <tr className="border-b border-border-subtle" {...props} />,
  th: (props) => <th className="text-left py-2 font-semibold" {...props} />,
  td: (props) => <td className="py-2" {...props} />,
  pre: (props) => <pre className="bg-ink text-bg p-4 rounded overflow-auto mb-4" {...props} />,
  code: (props) => <code className="font-mono text-sm" {...props} />,
  em: (props) => <em {...props} />,
  strong: (props) => <strong className="font-bold" {...props} />,
  del: (props) => <del {...props} />,
  img: (props) => <img className="max-w-full" {...props} />, // eslint-disable-line jsx-a11y/alt-text
  sup: (props) => <sup {...props} />,
  content: (props) => <div {...props} />,
  contentwrapper: (props) => <div {...props} />,
};
