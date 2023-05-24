import xxRequest from "@/service";
export function getChapterList(params: any) {
  return xxRequest.get({
    url: `/cartoon/chapter/list`,
    params,
  });
}

// 根据comic_id和chapter_id获取列表
export function getComicChapterListRequest(
  comic_id: number,
  chapter_id: number
) {
  return xxRequest.get({
    url: `/cartoon/list/${comic_id}/${chapter_id}`,
  });
}
