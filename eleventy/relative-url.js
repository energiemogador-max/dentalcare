// Computes a relative href from one site-absolute URL to another.
//
// Why this exists: the site is deployed to unknown/varying subpaths (GitHub
// Pages project preview, direct `file://` opening, and eventually a real
// domain root). Root-relative paths ("/styles.css") broke both GitHub Pages
// subpath preview and direct file opening -- see the fix in
// f327458 ("Fix 404s: switch asset and nav paths from root-relative to
// relative"). Every asset, nav and language-switcher href in this build MUST
// go through this helper instead of a hardcoded "../" or root-relative path,
// so that adding new pages/depths later (Phase 1+) keeps working
// automatically.
//
// Examples:
//   relativeUrl("/", "/en/")        -> "en/index.html"
//   relativeUrl("/en/", "/")        -> "../index.html"
//   relativeUrl("/en/", "/en/")     -> "index.html"   (self link)
//   relativeUrl("/en/", "/styles.css") -> "../styles.css"
"use strict";

const path = require("node:path");

function toFile(url) {
  if (!url) return "/index.html";
  return url.endsWith("/") ? `${url}index.html` : url;
}

function isExternal(url) {
  return /^([a-z][a-z0-9+.-]*:|#)/i.test(url || "");
}

function isAssetPath(url) {
  return !url.endsWith("/") && path.posix.extname(url) !== "";
}

function relativeUrl(fromUrl, toUrl) {
  if (!toUrl || isExternal(toUrl)) return toUrl;

  const toFileP = isAssetPath(toUrl) ? toUrl : toFile(toUrl);
  const fromDir = path.posix.dirname(toFile(fromUrl));
  let rel = path.posix.relative(fromDir, toFileP);
  if (rel === "") rel = path.posix.basename(toFileP);
  return rel;
}

module.exports = { relativeUrl, toFile };
