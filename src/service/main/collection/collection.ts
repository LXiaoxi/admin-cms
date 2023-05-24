import xxRequest from "@/service";
export function addCollection(pageName: string, id: number, params?: any) {
  return xxRequest.get({
    url: `/${pageName}/add/${id}`,
    params,
  });
}
