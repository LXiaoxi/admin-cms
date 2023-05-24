import xxRequest from "@/service";
export function getVideoFilmListRequest(params: any) {
  return xxRequest.get({
    url: `/video/film/list`,
    params,
  });
}
