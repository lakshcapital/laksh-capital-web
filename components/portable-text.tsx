import {
  PortableText,
  PortableTextComponents,
  PortableTextBlock,
} from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/image";

const calloutTones: Record<string, string> = {
  info: "border-blue-300 bg-blue-50 text-blue-900",
  success: "border-green-300 bg-green-50 text-green-900",
  warning: "border-amber-300 bg-amber-50 text-amber-900",
  tip: "border-primary/30 bg-primary/5 text-foreground",
};

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([\w-]{11})/
  );
  return match ? match[1] : null;
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 mb-4 text-2xl font-semibold lg:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 text-xl font-semibold lg:text-2xl">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-6 mb-2 text-lg font-semibold">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="mb-4 leading-7 text-foreground/80">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-primary pl-4 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 ml-6 list-disc space-y-2 text-foreground/80">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 ml-6 list-decimal space-y-2 text-foreground/80">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-7">{children}</li>,
    number: ({ children }) => <li className="leading-7">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
        {children}
      </code>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline underline-offset-4 hover:text-primary/80"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
            <Image
              src={urlFor(value).width(800).height(450).fit("crop").url()}
              alt={value.alt || "Blog image"}
              fill
              className="object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    imageRow: ({ value }) => {
      if (!value?.images?.length) return null;
      const cols =
        value.images.length === 2 ? "grid-cols-2" : "grid-cols-3";
      return (
        <div className={`my-8 grid ${cols} gap-3`}>
          {value.images.map(
            (
              img: { asset?: unknown; alt?: string; caption?: string },
              i: number
            ) => {
              if (!img?.asset) return null;
              return (
                <figure key={i} className="m-0">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                    <Image
                      src={urlFor(img).width(600).height(450).fit("crop").url()}
                      alt={img.alt || "Blog image"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {img.caption && (
                    <figcaption className="mt-1 text-center text-xs text-muted-foreground">
                      {img.caption}
                    </figcaption>
                  )}
                </figure>
              );
            }
          )}
        </div>
      );
    },
    codeBlock: ({ value }) => {
      if (!value?.code) return null;
      return (
        <pre className="my-6 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-100">
          <code className="font-mono">{value.code}</code>
        </pre>
      );
    },
    table: ({ value }) => {
      const rows: { cells?: string[] }[] | undefined = value?.rows;
      if (!rows?.length) return null;
      const [header, ...body] = rows;
      return (
        <div className="my-8 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            {header?.cells?.length ? (
              <thead>
                <tr className="border-b-2 border-border bg-muted/40">
                  {header.cells.map((cell, i) => (
                    <th
                      key={i}
                      className="px-3 py-2 text-left font-semibold"
                    >
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
            ) : null}
            <tbody>
              {body.map((row, ri) => (
                <tr key={ri} className="border-b border-border">
                  {row.cells?.map((cell, ci) => (
                    <td key={ci} className="px-3 py-2 text-foreground/80">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },
    youtubeEmbed: ({ value }) => {
      const id = value?.url ? getYouTubeId(value.url) : null;
      if (!id) return null;
      return (
        <div className="my-8 aspect-video overflow-hidden rounded-lg">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            title={value.title || "YouTube video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full border-0"
          />
        </div>
      );
    },
    callout: ({ value }) => {
      const tone = calloutTones[value?.tone || "info"] || calloutTones.info;
      return (
        <aside className={`my-6 rounded-lg border-l-4 p-5 ${tone}`}>
          {value?.title && (
            <p className="mb-2 font-semibold">{value.title}</p>
          )}
          {value?.body && (
            <p className="leading-7 whitespace-pre-line">{value.body}</p>
          )}
          {value?.ctaLabel && value?.ctaUrl && (
            <Link
              href={value.ctaUrl}
              target={value.ctaUrl.startsWith("http") ? "_blank" : undefined}
              rel={value.ctaUrl.startsWith("http") ? "noopener noreferrer" : undefined}
              className="mt-3 inline-flex items-center gap-1 text-sm font-medium underline underline-offset-4"
            >
              {value.ctaLabel} →
            </Link>
          )}
        </aside>
      );
    },
  },
};

interface PortableTextRendererProps {
  value: PortableTextBlock[] | undefined;
}

export default function PortableTextRenderer({
  value,
}: PortableTextRendererProps) {
  if (!value) return null;
  return <PortableText value={value} components={components} />;
}
