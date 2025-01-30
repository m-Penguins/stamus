// middleware/paginationCheck.ts

import { defineNuxtRouteMiddleware, navigateTo } from "#app";
function getStoreByPath(path: string) {
  if (path.startsWith("/portfolio")) {
    const store = usePlaceholdersStore();
    return store.portTotalPages;
  }
  if (path.startsWith("/team")) {
    const store = usePlaceholdersStore();
    return store.teamTotalPages;
  }
  if (path.startsWith("/articles")) {
    const store = usePlaceholdersStore();
    return store.artiTotalPages;
  }
  if (path.startsWith("/reviews")) {
    const store = useBaseDataStore();
    return store.reviTotalPages;
  }

  return null;
}

export default defineNuxtRouteMiddleware(async (to, from) => {

  let totalPages = getStoreByPath(to.path);
  if (!totalPages || totalPages < 1) {
    totalPages = 1;
  }

  const pageParam = to.query.page;
  let page = typeof pageParam === "string" ? parseInt(pageParam, 10) : 1;
  if (isNaN(page)) {
    page = 1;
  }

  page = Math.max(1, Math.min(page, totalPages));
  
  if (page === 1) {
    if (typeof pageParam !== "undefined") {
      const { page: _, ...otherParams } = to.query;
      return navigateTo({
        path: to.path,
        query: otherParams,
        replace: true,
      });
    }
  } else {
    if (pageParam !== page.toString()) {
      return navigateTo({
        path: to.path,
        query: {
          ...to.query,
          page: page.toString(),
        },
        replace: true,
      });
    }
  }
});
