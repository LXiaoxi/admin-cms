import xxRequest from "@/service";
export function getNovelCategoryListRequest() {
  return xxRequest.get({
    url: `/novel/category/list`,
  });
}
