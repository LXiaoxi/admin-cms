import xxRequest from "@/service";
// 获取
export function getCartoonListRequest(params: any) {
  return xxRequest.get({
    url: `/cartoon/list`,
    params,
  });
}
