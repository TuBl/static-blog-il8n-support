import { compile, run } from "@mdx-js/mdx";
// import { PluggableList } from "@mdx-js/mdx/core"
// import { RunOptions } from "@mdx-js/mdx/run";
import { MDXProps } from "mdx/types";
import Image from "next/image";
import rehypeAutolinkHeadings, {
  Options as AutolinkHeadingsOptions,
} from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import * as runtime from "react/jsx-runtime";

interface Props extends MDXProps {
  content: string;
  lang: "ar" | "en";
}

export async function MDX({ content, lang, ...rest }: Props) {
  const isRTL = lang === "ar";
  const rehypePlugins = [
    rehypeSlug,
    [
      rehypeAutolinkHeadings,
      {
        behavior: "wrap",
        test: (element) => {
          if (element.tagName === "h1") return false;
          return true;
        },
      } as AutolinkHeadingsOptions,
    ],
  ];

  const compiled = await compile(content, {
    outputFormat: "function-body",
    remarkPlugins: [remarkGfm],
    // @ts-expect-error keda keda
    rehypePlugins,
  });

  const { default: MDXContent } = await run(compiled.toString(), {
    ...runtime,
    baseUrl: import.meta.url,
  });

  return (
    <div className={`container mx-auto px-4 py-8`}>
      <div
        className={`prose prose-lg dark:prose-invert mx-auto ${
          isRTL ? "text-right rtl" : "text-left"
        }`}
      >
        <MDXContent
          {...rest}
          components={{
            UnstyledCode: ({ children }) => (
              <code className="not-prose font-code">`{children}`</code>
            ),
            MDX,
            NextImage: Image,
            ...rest.components,
          }}
        />
      </div>
    </div>
  );
}
