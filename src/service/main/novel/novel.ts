import xxRequest from "@/service";
export function getNovelListRequest(params: any) {
  return xxRequest.get({
    url: `/novel/list`,
    params,
  });
}
