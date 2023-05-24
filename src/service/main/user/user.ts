import xxRequest from "@/service";
export function getGeneralUserRequest(params: { page: number; pageSize: number }) {
  return xxRequest.get({
    url: `/user/general/list`,
    params,
  });
}
