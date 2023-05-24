import xxRequest from "@/service";
export function getRoleListRequest(params: any) {
  return xxRequest.get({
    url: `/role/list`,
    params,
  });
}
