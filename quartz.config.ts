import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "arjun's itp-blog",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "en-US",
    baseUrl: "arjunmakesthings.github.io/itp-blog",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Alegreya Sans",
        body: "Alegreya Sans",
        code: "Fira Code",
      },
      /*
      colors: controls the theming of the site.

      light: page background
      lightgray: borders
      gray: graph links, heavier borders
      darkgray: body text
      dark: header text and icons
      secondary: link colour, current graph node
      tertiary: hover states and visited graph nodes
      highlight: internal link background, highlighted text, highlighted lines of code
      textHighlight: markdown highlighted text background

      original colours: 
        lightMode: {
          light: "#faf8f8",
          lightgray: "#e5e5e5",
          gray: "#b8b8b8",
          darkgray: "#4e4e4e",
          dark: "#2b2b2b",
          secondary: "#284b63",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#fff23688",
        },
      */
      colors: {
        lightMode: {
          light: "rgb(253, 253, 253)", //for bg.
          lightgray: "rgb(220, 220, 220)", //for borders, and links.
          gray: "#b8b8b8", //graph links, and heavier borders — but i don't know what this is for.
          darkgray: "rgb(60, 60, 60)", //for body.
          dark: "rgb(60, 60, 60)", //header text and icons.
          secondary: "var(--primary-color)", //link colour, current graph node.
          tertiary: "var(--secondary-color)",
          highlight: "rgba(143, 159, 169, 0.15)", //internal link background, highlights. unchanged right now.
          textHighlight: "#fff6d1",
        },
        /* the below colours aren't technically needed, because people cannot shift between light & dark modes on the website. but, because of the way that it's set up, i need to include these. */
        darkMode: {
          light: "#161618",
          lightgray: "#393639",
          gray: "#646464",
          darkgray: "#d4d4d4",
          dark: "#ebebec",
          secondary: "#7b97aa",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown({linkHeadings:false,}!),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
