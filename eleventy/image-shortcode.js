// @11ty/eleventy-img shortcode: AVIF + WebP, responsive srcset, explicit
// width/height, lazy by default. See docs/SEO-PLAN.md §9.
//
// Output <img> src/srcset are made RELATIVE to the calling page (via
// relative-url.js), matching the hard constraint that this site never ships
// root-relative paths. eleventy-img's own `urlPath` option is only used
// internally to build its metadata; every URL it returns is rewritten
// through relativeUrl(pageUrl, ...) before it reaches the HTML.
"use strict";

const path = require("node:path");
// @11ty/eleventy-img v7 ships as ESM with a CJS interop shim: the callable
// generator function (equivalent to the old v3 default export) lands on
// `.default` here, not the module object itself, and not `.Image` (that's
// the newer low-level class).
const Image = require("@11ty/eleventy-img").default;
const { relativeUrl } = require("./relative-url.js");

const OUTPUT_DIR = "./_site/images/optimized/";
const URL_PATH = "/images/optimized/";

async function imageShortcode(src, alt, options = {}) {
  if (alt === undefined || alt === null) {
    throw new Error(`image shortcode: missing \`alt\` text for "${src}" (use alt: "" only for decorative images)`);
  }

  const {
    widths = [450, 900],
    loading = "lazy",
    fetchpriority,
    className,
    sizes = "100vw",
    pageUrl = "/"
  } = options;

  const inputPath = path.posix.join("src/images", src);

  const metadata = await Image(inputPath, {
    widths,
    formats: ["avif", "webp"],
    outputDir: OUTPUT_DIR,
    urlPath: URL_PATH,
    filenameFormat(id, inputSrc, width, format) {
      const name = path.basename(inputSrc, path.extname(inputSrc));
      return `${name}-${width}w.${format}`;
    }
  });

  const toRel = (absUrl) => relativeUrl(pageUrl, absUrl);

  const formatsInOrder = ["avif", "webp"].filter((f) => metadata[f]);
  const sources = formatsInOrder
    .map((format) => {
      const variants = metadata[format];
      const srcset = variants.map((v) => `${toRel(v.url)} ${v.width}w`).join(", ");
      return `<source type="${variants[0].sourceType}" srcset="${srcset}" sizes="${sizes}">`;
    })
    .join("");

  const fallbackFormat = metadata.webp || metadata.avif;
  const largest = fallbackFormat[fallbackFormat.length - 1];

  const attrs = [
    `src="${toRel(largest.url)}"`,
    `alt="${String(alt).replace(/"/g, "&quot;")}"`,
    `width="${largest.width}"`,
    `height="${largest.height}"`,
    `decoding="async"`
  ];
  if (loading) attrs.push(`loading="${loading}"`);
  if (fetchpriority) attrs.push(`fetchpriority="${fetchpriority}"`);
  if (className) attrs.push(`class="${className}"`);

  return `<picture>${sources}<img ${attrs.join(" ")}></picture>`;
}

module.exports = imageShortcode;
