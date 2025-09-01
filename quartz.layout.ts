// mod: define Explorer functions
import { Options } from "./quartz/components/Explorer"

export const mapFn: Options["mapFn"] = (node) => {
  return node
}
export const filterFn: Options["filterFn"] = (node) => {
  return node.slugSegment !== "tags"
}
export const sortFn: Options["sortFn"] = (a, b) => {
  // mod: sort folders and files based on folderOrder and noteOrder
  //      to find ways to retrieve folderOrder and noteOrder from frontmatter
  //      we now have to include frontmatter in ContentDetails and linkIndex.set()

  // extract order from frontmatter
  const orderA = a.isFolder
    ? (a.data?.frontmatter?.folderOrder as number | undefined)
    : (a.data?.frontmatter?.noteOrder as number | undefined)
  const orderB = b.isFolder
    ? (b.data?.frontmatter?.folderOrder as number | undefined)
    : (b.data?.frontmatter?.noteOrder as number | undefined)

  // // method I: folders first, then files, sort folders and files separately
  // // compare orderA and orderB, those undefined will be placed at the end
  // if ((!a.isFolder && !b.isFolder) || (a.isFolder && b.isFolder)) {
  //   if (orderA !== undefined && orderB !== undefined) {
  //     // compare based on the order
  //     return orderA - orderB;
  //   } else if (orderA !== undefined) {
  //     // move B to the back
  //     return -1;
  //   } else if (orderB !== undefined) {
  //     // move A to the back
  //     return 1;
  //   } else {
  //     // fall back to alphabetical order
  //     return a.displayName.localeCompare(b.displayName);
  //   }
  // }
  // // keep folders in front
  // if (!a.isFolder && b.isFolder) {
  //   return 1
  // } else {
  //   return -1
  // }

  // method II: sort folders together with files, treat folders as files
  // compare orderA and orderB, those undefined will be placed at the end
  if (orderA !== undefined && orderB !== undefined) {
    return orderA - orderB
  } else if (orderA !== undefined) {
    return -1
  } else if (orderB !== undefined) {
    return 1
  } else {
    return a.displayName.localeCompare(b.displayName)
  }
}

import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(), //this doesn't appear on the page, and is only responsible for the metadata about the document; like title, scripts and styles. also has favicon though.
  header: [], // this comes before the 'beforeBody' section, but was discontinued in quartz 4. i keep it discontinued, because i like the idea of having the left-sidebar be a way for people to search through notes.
  afterBody: [],
  footer: Component.Footer(),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    // Component.ConditionalRender({
    //   component: Component.Breadcrumbs(),
    //   condition: (page) => page.fileData.slug !== "index",
    // }),
    Component.ArticleTitle(),
    Component.ContentMeta({ showReadingTime: false, showComma: false }), //remove reading-time.
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        // { Component: Component.Darkmode() },
        // { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer({
      title: "all:",
      folderDefaultState: "open",
      useSavedState: false,
      mapFn,
      filterFn,
      sortFn,
    }),
  ],
  right: [
    Component.Graph(),
    // Component.DesktopOnly(Component.TableOfContents()),
    // Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  // beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  beforeBody: [Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        // { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({
      title: "all:",
      folderDefaultState: "open",
      useSavedState: false,
      mapFn,
      filterFn,
      sortFn,
    }),
  ],
  right: [],
}
