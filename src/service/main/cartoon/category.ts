import xxRequest from "@/service";
export function getCategoryRequest(params: any) {
  return xxRequest.get({
    url: `cartoon/category/list`,
    params,
  });
}
