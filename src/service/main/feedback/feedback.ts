import xxRequest from "@/service";

export function getFeedbackListRequest(params: { page: number; pageSize: number }) {
  return xxRequest.get({
    url: `/feedback/list`,
    params,
  });
}

export function deleteFeedbackRequest(id: number) {
  return xxRequest.delete({
    url: `/feedback/delete/${id}`,
  });
}

export function handleFeedbackRequest(id: number) {
  return xxRequest.put({
    url: `/feedback/handle/${id}`,
  });
}
