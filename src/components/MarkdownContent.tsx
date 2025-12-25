import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownContent({ markdown }: { markdown: string }) {
  return (
    <div className="text-neutral-900">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: (props) => (
            <h1 className="sh1 text-primary-700 mb-4" {...props} />
          ),
          h2: (props) => (
            <h2 className="sh2 text-neutral-900 mt-6 mb-3" {...props} />
          ),
          h3: (props) => (
            <h3 className="sh3 text-neutral-900 mt-5 mb-2" {...props} />
          ),
          p: (props) => (
            <p className="b3 text-neutral-900 leading-relaxed mb-4" {...props} />
          ),
          a: ({ className, ...props }) => (
            <a
              className={`text-primary-700 underline underline-offset-4 ${className ?? ""}`}
              {...props}
            />
          ),
          ul: (props) => <ul className="list-disc pl-6 mb-4 space-y-1" {...props} />,
          ol: (props) => <ol className="list-decimal pl-6 mb-4 space-y-1" {...props} />,
          li: (props) => <li className="b3 text-neutral-900" {...props} />,
          blockquote: (props) => (
            <blockquote
              className="border-l-4 border-neutral-100 pl-4 py-1 my-4 text-neutral-600"
              {...props}
            />
          ),
          hr: () => <hr className="my-6 border-neutral-100" />,
          code: (props) => (
            <code
              className="rounded bg-neutral-100 px-1.5 py-0.5 text-neutral-900"
              {...props}
            />
          ),
          pre: (props) => (
            <pre
              className="bg-neutral-100 rounded-2xl p-4 overflow-x-auto mb-4"
              {...props}
            />
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
