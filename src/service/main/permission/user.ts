import xxRequest from "../../index";

export function getUserListRequest(data: any) {
  return xxRequest.get({
    url: `/user/list`,
    data,
  });
}
// 新建用户
export function newUserRequest(data: any) {
  return xxRequest.post({
    url: `/user/register`,
    data,
  });
}

// 编辑用户信息
export function updateUserRequest(id: number, data: any) {
  return xxRequest.put({
    url: `/user/update/${id}`,
    data,
  });
}
// 通用
function processingPath(
  operation: string, // 删除/新增/编辑/添加
  pageName: string, // 是删除/新增/编辑/添加 前面的路径
  otherInfo?: string // 是删除/新增/编辑/添加 后面是否需要其他字段拼接
) {
  let newOperation = operation;
  if (otherInfo) {
    newOperation.concat(`${otherInfo}`);
  }
  return `/${pageName}/${newOperation}`;
}
// 新建
export function newPageRequest(pageName: string, data: any, otherInfo?: string) {
  return xxRequest.post({
    url: `${processingPath("add", pageName, otherInfo)}`,
    data,
  });
}

// 编辑
export function updatePageRequest(pageName: string, id: number, data: any, otherInfo?: string) {
  return xxRequest.put({
    url: `${processingPath("update", pageName, otherInfo)}/${id}`,
    data,
  });
}

export function detelePagePequest(pageName: string, id: number, otherInfo?: string) {
  return xxRequest.delete({
    url: `${processingPath("delete", pageName, otherInfo)}/${id}`,
  });
}

export function deleteUserRequest(id: number) {
  return xxRequest.delete({
    url: `/user/delete/${id}`,
  });
}
