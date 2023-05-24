import xxRequest from "@/service";
export function getVideoCondition(id: number) {
  return xxRequest.get({
    url: `/video/condition/list/${id}`,
  });
}
