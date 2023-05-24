import xxRequest from "@/service";
export function getVideoCategoryRequest() {
  return xxRequest.get({
    url: `/video/category/list`,
  });
}
