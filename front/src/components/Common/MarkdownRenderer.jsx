import Markdown from "react-markdown";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import tw from "tailwind-styled-components";

export default function MarkdownRenderer({ raw }) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");

          return !inline ? (
            <CustomSyntaxHighlighter
              style={a11yDark}
              PreTag="div"
              language={match ? match[1] : undefined}
              children={String(children).replace(/\n$/, "")}
              {...props}
            />
          ) : (
            <code className={className ? className : ""} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {raw}
    </Markdown>
  );
}

const CustomSyntaxHighlighter = tw(SyntaxHighlighter)`
-ml-4
mt-2
`;
