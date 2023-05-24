import xxRequest from "@/service";
export function getMenuListRequest() {
  return xxRequest.get({
    url: `/menu/list`,
  });
}
